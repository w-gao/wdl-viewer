from typing import Union, Optional, List

from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


class WdlGraph(AbstractWdlGraph):
    """
    WDL development.

    NOTE: the development version is constantly changing.
    """
    def __init__(
            self,
            wdl_url: str,
            wdl_stream: Union[str, bytes],
            as_: Optional[str] = None,
            aliases: Optional[List[str]] = None):
        super().__init__(wdl_url, wdl_stream, as_, aliases)

    @property
    def version(self) -> str:
        return "development"
