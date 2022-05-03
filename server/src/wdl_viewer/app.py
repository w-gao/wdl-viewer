import os

from flask import Flask, Blueprint, request, redirect
from werkzeug.exceptions import HTTPException, abort

from wdl_viewer.core import Session


bp = Blueprint('core', __name__)


@bp.route('/')
def index():
    return {"message": "WDL viewer API"}


@bp.route('/workflow/graph', methods=["POST"])
def workflow_graph():
    """
    Get the workflow graph.
    """
    # PARAMS -> request.args
    # FORM BODY -> request.form
    # JSON BODY -> request.json
    # BODY FILES -> requests.files

    workflow_url = request.form.get("workflow_url", request.json.get("workflow_url", None))
    if not workflow_url:
        raise ValueError("You must set a workflow_url in the request body.")

    try:
        session = Session()
        graph = session.get_graph_with_cache(workflow_url)
        graph.parse_tree()
    except Exception as e:
        abort(500, "Something went wrong: " + str(e))
        return

    return {
        "message": "success",
        "version": graph.version,
        "wf_dependencies_graph": graph.serialize_wdl_dependencies(),
        # "files": [
        #     f.filename for f in request.files.getlist("workflow_attachments")
        # ]
    }


app = Flask(__name__)

from flask_cors import CORS
CORS(app, resources={r'/*': {'origins': 'http://localhost:3000'}})

app.register_blueprint(bp, url_prefix="/api/v1")


@app.route('/')
def index():
    return redirect("/api/v1")


@app.errorhandler(404)
@app.errorhandler(405)
def handle_error(err: HTTPException):
    return {"message": str(err), "code": err.code}, err.code


@app.errorhandler(Exception)
def all_exception_handler(err: Exception):
    """
    Catch all deliberate or unwanted exceptions and turn them into an
    interpretable error message.
    """
    code = 500
    if isinstance(err, ValueError):
        code = 400
    return {"message": str(err), "code": code}, code


def main():
    port = os.environ.get("WDL_VIEWER_PORT", 5000)

    # Flask app
    app.run(host='0.0.0.0', port=port)

    # WebSocket app
    # server = WdlViewerServer()
    # server.start("0.0.0.0", port)


if __name__ == "__main__":
    main()
