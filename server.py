from sanic import Sanic
from sanic_jwt import Initialize, protected
from sanic.request import Request
from sanic.response import json
import json as json_


async def authenticate(request):
    return {"user_id": 1}


app = Sanic("main")
Initialize(app,
           authenticate=authenticate,
           cookie_set=True,
           cookie_split=True,
           path_to_authenticate="/login")


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
    app.run(auto_reload=True, port=4000)
