from sanic.blueprints import Blueprint
from sanic.response import json

bp = Blueprint("auth", url_prefix="api/auth")


@bp.route("add_user", methods=("POST",))
async def add_user(request):
    return json({"ok": True, "route": "add_user"})


@bp.route("delete_user", methods=("POST",))
async def delete_user(request):
    return json({"ok": True, "route": "delete_user"})
