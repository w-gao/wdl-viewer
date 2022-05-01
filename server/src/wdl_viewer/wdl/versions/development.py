from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


class WdlGraph(AbstractWdlGraph):
    """
    WDL development.

    NOTE: the development version is constantly changing.
    """
    def __init__(self, wdl_stream: str):
        super().__init__(wdl_stream)

    @property
    def version(self) -> str:
        return "development"
