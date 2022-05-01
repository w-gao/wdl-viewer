from antlr4 import InputStream, CommonTokenStream
from wdl_parsers.v1_0.WdlV1Lexer import WdlV1Lexer
from wdl_parsers.v1_0.WdlV1Parser import WdlV1Parser

from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph


class WdlV1Graph(AbstractWdlGraph):
    """
    WDL v1.0
    """
    def __init__(self, wdl_stream: str):
        super().__init__(wdl_stream)

    @property
    def version(self) -> str:
        return "1.0"

    def parse_tree(self):
        lexer = WdlV1Lexer(InputStream(self.wdl_stream))
        parser = WdlV1Parser(input=CommonTokenStream(lexer))
        tree = parser.document()
        self.visit_document(tree)

    def visit_document(self, ctx: "WdlV1Parser.DocumentContext"):
        """
        Root of tree.

        Contains the version followed by an optional workflow and any number of
        `document_element`s.
        """
        wf = ctx.workflow()
        # if wf:
        #     self.visit_workflow(wf)

        # for element in ctx.document_element():
        #     self.visit_document_element(element)
