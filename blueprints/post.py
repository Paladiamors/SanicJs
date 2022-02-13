from sanic.request import Request
from sanic.blueprints import Blueprint
from sanic.response import json

bp = Blueprint("post", url_prefix="api/post")


@bp.route("post_json", methods=("POST",))
async def post_json(request: Request):
    return json(request.json)


@bp.route("post_form", methods=("POST",))
async def post_form(request: Request):
    result = {k: v[0] for k, v in request.form.items()}
    return json(result)
