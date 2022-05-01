# wdl-viewer-api

The REST API for WDL viewer. Handles WDL file parsing and conversion to a
simplified DAG for display.

## Developer notes

NOTE: this is written in Python because ANTLR4 does not provide official support for TypeScript
yet. So, instead of dealing with mixing JavaScript and TypeScript with Node.js, let's use Flask
for now.
