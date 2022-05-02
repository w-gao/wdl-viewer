from typing import Dict, Optional
from wdl_viewer.wdl.utils import get_graph
from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


class Session:
    """
    Represents a collection of WDL documents
    """
    def __init__(self):
        self.graphs: Dict[str, AbstractWdlGraph] = {}

    def _import_graph_with_cache(self, url, *args, **kwargs) -> Optional[AbstractWdlGraph]:
        """
        Overrides the WdlGraph::import_graph() method to cache visited graphs.
        """
        if self.graphs.get(url, None):
            return self.graphs[url]
        graph = get_graph(url, *args, **kwargs)
        graph.import_graph = self._import_graph_with_cache
        graph.parse_tree()

        self.graphs[url] = graph
        return graph

    def get_graph_with_cache(self, url, *args, **kwargs) -> "AbstractWdlGraph":
        """
        Get a WdlGraph with caching support (imports of duplicate workflows
        will be cached).
        """
        graph = get_graph(url, *args, **kwargs)
        graph.import_graph = self._import_graph_with_cache
        return graph
