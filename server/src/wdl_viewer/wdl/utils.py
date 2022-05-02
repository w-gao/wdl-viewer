# Part of this file comes from DataBiosphere/toil under the Apache v2 license.
# See: https://github.com/DataBiosphere/toil/blob/master/LICENSE
import requests

from typing import Optional, List
from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


def get_version(iterable) -> str:
    """
    Get the version of the WDL document.

    :param iterable: An iterable that contains the lines of a WDL document.
    :return: The WDL version used in the workflow.
    """
    if isinstance(iterable, str):
        iterable = iterable.split('\n')

    for line in iterable:
        if isinstance(line, bytes):
            line = line.decode('utf-8')
        line = line.strip()
        # check if the first non-empty, non-comment line is the version statement
        if line and not line.startswith('#'):
            if line.startswith('version '):
                return line[8:].strip()
            break

    # only draft-2 doesn't contain the version declaration
    return 'draft-2'


def get_graph(wdl_url: str, as_: Optional[str] = None, aliases: Optional[List[str]] = None) -> AbstractWdlGraph:
    """
    Creates an instance of a WDLGraph based on the version.

    :param wdl_url: The URL to the WDL file.
    :param as_:
    :param aliases:
    """

    if wdl_url.startswith(("http://", "https://")):
        response = requests.get(wdl_url, stream=True)
        stream = response.content.decode('utf-8')
        version = get_version(response.iter_lines())
    else:
        if wdl_url.startswith("file://"):
            wdl_url = wdl_url[len("file://"):]
        with open(wdl_url, "r") as f:
            stream = f.read()
            f.seek(0)
            version = get_version(f)

    if version == 'draft-2':
        raise NotImplementedError("draft-2 version is no longer supported.")
    elif version == '1.0':
        from wdl_viewer.wdl.versions.v1_0 import WdlV1Graph
        return WdlV1Graph(wdl_url, stream, as_, aliases)
    elif version == '1.0':
        from wdl_viewer.wdl.versions.v1_1 import WdlV1Graph
        return WdlV1Graph(wdl_url, stream, as_, aliases)
    elif version == 'development':
        from wdl_viewer.wdl.versions.development import WdlGraph
        return WdlGraph(wdl_url, stream, as_, aliases)
    else:
        raise RuntimeError(f"Unsupported WDL version: '{version}'.")

