import os
from typing import Union, Optional, Dict, Any, Callable


def is_context(ctx, classname: Union[str, tuple]) -> bool:
    """
    Returns whether an ANTLR4 context object is of the precise type `classname`.

    Modified from: https://github.com/DataBiosphere/toil/blob/master/src/toil/wdl/versions/v1.py

    :param ctx: An ANTLR4 context object.
    :param classname: The class name(s) as a string or a tuple of strings. If a
                      tuple is provided, this returns True if the context object
                      matches one of the class names.
    """
    # we check for `ctx.__class__.__name__` so that it's portable across multiple similar auto-generated parsers.
    if isinstance(classname, str):
        return ctx.__class__.__name__ == classname
    return ctx.__class__.__name__ in classname


class AbstractWdlGraph:
    """
    An abstract class that defines the graph structure of a WDL document.
    """

    def __init__(
            self,
            wdl_url: str,
            wdl_stream: Union[str, bytes],
            as_: Optional[str] = None,
            aliases: Optional[str] = None):
        """
        :param wdl_url: The URL where the WDL document originates.
        :param wdl_stream: A stream of bytes that contain the WDL document.
        """
        self.wdl_url = wdl_url
        self.wdl_stream = wdl_stream
        self.as_ = as_
        self.aliases = aliases

        # Callbacks
        self.get_graph_with_cache: Optional[Callable[[], AbstractWdlGraph]] = None

        # The workflow identifier. None if there is no workflow in the document.
        self.workflow_name: Optional[str] = None

        # A collection of dependency WDL workflows used by this WDL workflow.
        self.wdl_dependencies: Dict[str, AbstractWdlGraph] = {}

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

    def import_graph(self, url: str, *args, **kwargs) -> "Optional[AbstractWdlGraph]":
        """
        Get the graph of an import WDL document.
        """
        from wdl_viewer.wdl.utils import get_graph
        graph = get_graph(url, *args, **kwargs)
        graph.parse_tree()
        return graph

    def serialize_wdl_dependencies(self) -> Dict[str, Any]:
        """
        Serialize the WDL dependencies recursively as a graph structure.
        """

        # key = os.path.splitext(os.path.basename(self.wdl_url))[0]

        return {
            "identifier": self.wdl_url,
            "filename": os.path.basename(self.wdl_url),
            "as": self.as_,
            "imports": [obj.serialize_wdl_dependencies() for obj in self.wdl_dependencies.values()]
        }
