import logging
from typing import Optional, Union, List
from urllib.parse import urljoin

from antlr4 import InputStream, CommonTokenStream
from wdl_parsers.v1_0.WdlV1Lexer import WdlV1Lexer
from wdl_parsers.v1_0.WdlV1Parser import WdlV1Parser

from wdl_viewer.wdl.wdl_graph import AbstractWdlGraph, is_context


class WdlV1Graph(AbstractWdlGraph):
    """
    WDL v1.0
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
        if ctx.workflow():
            self.visit_workflow(ctx.workflow())

        for element in ctx.document_element():
            self.visit_document_element(element)

    def visit_document_element(self, ctx: "WdlV1Parser.Document_elementContext"):
        """
        Contains one of the following: 'import_doc', 'struct', or 'task'.
        """
        element = ctx.children[0]
        if is_context(element, 'TaskContext'):
            pass
        elif is_context(element, 'StructContext'):
            pass
        elif is_context(element, 'Import_docContext'):
            self.visit_import_doc(element)
        else:
            raise RuntimeError(f'Unrecognized document element in visit_document_element(): {type(element)}')

    def visit_import_doc(self, ctx: "WdlV1Parser.Import_docContext"):
        url = self.visit_string(ctx.string())
        as_ = None
        import_asCtx: "WdlV1Parser.Import_asContext" = ctx.import_as()
        if import_asCtx:
            as_ = import_asCtx.Identifier().getText()

        # collapse redundant separators and up-level references
        full_url = urljoin(self.wdl_url, url)
        logging.warning("Visiting: " + full_url)

        graph = self.import_graph(full_url, as_)
        if graph:
            # key = os.path.splitext(os.path.basename(url))[0]
            self.wdl_dependencies[as_] = graph

    def visit_workflow(self, ctx: "WdlV1Parser.WorkflowContext"):
        """
        Contains an 'identifier' and an array of `workflow_element`s.
        """
        identifier = ctx.Identifier().getText()
        self.workflow_name = identifier

        for element in ctx.workflow_element():
            pass

    def visit_string(self, ctx):
        """
        Contains a `string_part` followed by an array of `string_expr_with_string_part`s.
        """
        string = self.visit_string_part(ctx.string_part())

        for part in ctx.string_expr_with_string_part():
            # TODO: deal with expressions
            pass

        # TODO: this should return a custom string object with expressions, once we implement expression support
        return string

    def visit_string_part(self, ctx: "WdlV1Parser.String_partContext") -> Optional[str]:
        """
        Returns a string representing the string_part.
        """
        # join here because a string that contains '$', '{', or '}' is split
        part = ''.join(part.getText() for part in ctx.StringPart())

        if part:
            return part
        return None
