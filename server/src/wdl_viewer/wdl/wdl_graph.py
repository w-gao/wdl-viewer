from typing import Union


class AbstractWdlGraph:
    """
    An abstract class that defines the graph structure of a WDL document.
    """
    def __init__(self, wdl_stream: Union[str, bytes]):
        """
        :param wdl_stream: A stream of bytes that contain the WDL document
        """
        self.wdl_stream = wdl_stream

    @property
    def version(self) -> str:
        """
        Returns the version of the WDL document as a string.
        """
        raise NotImplementedError

    def parse_tree(self):
        """
        Parse the WDL document from self.wdl_stream. Must be called once before
        graph data are available.
        """
        raise NotImplementedError
