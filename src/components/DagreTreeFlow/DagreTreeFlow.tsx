import dagre from 'dagre';
import { useCallback } from 'react';
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  useNodesState,
  useEdgesState,
  Connection,
  Node as ReactFlowNode,
  Edge,
  Position
} from 'reactflow';

import { initialNodes, initialEdges } from '../../data/example_wdl_elements.js';
import 'reactflow/dist/style.css';
import './DagreTreeFlow.css';


const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 250;
const nodeHeight = 50;

const getLayoutedElements = (nodes: ReactFlowNode[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({
    // See: https://github.com/dagrejs/dagre/wiki#configuring-the-layout
    rankdir: direction,
    // acyclicer: "greedy",
    // ranker: "tight-tree",
    // nodesep: 100,
    // edgesep: 20,
    ranksep: 100,
    align: "UL"
 });

  nodes.forEach((node: ReactFlowNode) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge: Edge & {weight?: number }) => {
    dagreGraph.setEdge(edge.source, edge.target, { /* weight: edge.weight ?? 1 */});
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const DagreTreeFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SimpleBezier, animated: true }, eds)
      ),
    []
  );

  const onLayout = useCallback(
    (direction: string) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  const onNodeClick = (ev: MouseEvent, node: ReactFlowNode) => {
    setNodes(nds => nds.filter(n => n.id != node.id))
    console.log(node)
  }

  return (
    <div className="layoutflow">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // @ts-ignore
        onNodeClick={onNodeClick}
        connectionLineType={ConnectionLineType.SimpleBezier}
        fitView
      />
      <div className="controls">
        <button onClick={() => onLayout('TB')}>vertical layout</button>
        <button onClick={() => onLayout('LR')}>horizontal layout</button>
      </div>
    </div>
  );
};

export default DagreTreeFlow;
