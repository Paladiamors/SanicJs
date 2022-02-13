from sanic import Sanic
from sanic_jwt import Initialize, protected, exceptions
from sanic.request import Request
from sanic.response import json
from blueprints.auth import bp as auth
import json as json_
from options import setup_options
from cors import add_cors_headers


async def authenticate(request):
    info = json_.loads(request.body)
    if info["username"] == 1:
        return {"user_id": 1}
    raise exceptions.AuthenticationFailed("Invalid credentials")


app = Sanic("main")
Initialize(app,
           authenticate=authenticate,
           cookie_set=True,
           cookie_split=True,
           url_prefix="/api/auth",
           path_to_authenticate="/login")
# Add OPTIONS handlers to any route that is missing it
app.register_listener(setup_options, "before_server_start")
# Fill in CORS headers
app.register_middleware(add_cors_headers, "response")


@app.route("/", methods=("GET", "POST"))
def index(request: Request):
    if request.method == "GET":
        return json({"msg": "Hello World!"})
    else:
        response = json(json_.loads(request.body))
        response.cookies["session"] = "secret"
        response.cookies["number"] = "10"
        return response


@protected()
@app.route("/protected")
def protected(response):
    return json({"ok": True})


if __name__ == "__main__":
    app.blueprint(auth)
    app.run(auto_reload=True, port=4000)
