from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


class WdlV1Graph(AbstractWdlGraph):
    """
    WDL v1.1
    """
    def __init__(self, wdl_stream: str):
        super().__init__(wdl_stream)

    @property
    def version(self) -> str:
        return "1.1"
