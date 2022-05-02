import asyncio
import json
import logging
from typing import Any, Dict
from uuid import uuid4

import websockets
from wdl_viewer.wdl.utils import get_graph

from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


"""
WebSocket backend. Use this if we can't load everything via a single request,
and that it would make more sense to lazy load parts of WDL workflow only if
requested. Also necessary if we have editor support, so we can have
bi-direction communication.
"""


class Session:
    def __init__(self, ws):
        self.ws = ws
        self.uuid = ws.uuid
        self.workflows: Dict[str, AbstractWdlGraph] = {}

    async def send(self, payload: Any):
        await self.ws.send(json.dumps(payload))

    async def handle_message(self, data: str):
        message: Dict[str, Any] = json.loads(data)
        msg_id = message.get("id", "")
        payload = message.get("payload", {})
        if msg_id == "workflow_request":
            await self.create_workflow(payload)
        else:
            await self.send({"id": "error", "message": "received unknown message id: " + msg_id})

    async def create_workflow(self, payload: Dict[str, Any]):
        workflow_url = payload.get("workflow_url", None)

        if not workflow_url:
            await self.send({"id": "error", "message": "Invalid workflow_url"})
            return

        graph = get_graph(workflow_url)
        graph.parse_tree()

        workflow_uuid = str(uuid4())
        self.workflows[workflow_uuid] = graph

        await self.send({"id": "workflow_created", "uuid": workflow_uuid})
        await self.send({"id": "workflow_data", "type": "wf_overview", "payload": graph.wdl_dependencies})


class WdlViewerServer:
    def __init__(self):
        # :param work_dir: The working directory where temp files are stored.
        self.connections: Dict[str, Session] = {}

    async def on_connect(self, websocket) -> Session:
        websocket.uuid = str(uuid4())
        session = Session(websocket)
        self.connections[websocket.uuid] = session
        return session

    async def on_disconnect(self, websocket):
        try:
            del self.connections[websocket.uuid]
        except KeyError:
            pass

    async def broadcast(self, message: str):
        """
        Broadcast a message to all connected clients.
        """
        if not self.connections:
            return

        await asyncio.wait([
            connection.send(message) for connection in self.connections.values()
        ])

    async def handle_connection(self, websocket, path: str):
        session = await self.on_connect(websocket)
        try:
            await websocket.send({"id": "connected"})
            async for data in websocket:
                await session.handle_message(data)
        finally:
            await self.on_disconnect(websocket)

    def start(self, host: str, port: int):
        """ Start the WebSocket server."""
        start_server = websockets.serve(self.handle_connection, host, port)
        logging.warning(f"WebSocket server started on port {port}.")

        try:
            asyncio.get_event_loop().run_until_complete(start_server)
            asyncio.get_event_loop().run_forever()
        except KeyboardInterrupt:
            # TODO: clean up
            logging.warning("WebSocket server shut down,")

