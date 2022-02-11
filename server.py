from sanic import Sanic
from sanic.request import Request
from sanic.response import json
import json as json_
app = Sanic("main")


@app.route("/", methods=("GET", "POST"))
def index(request: Request):
    if request.method == "GET":
        return json({"msg": "Hello World!"})
    else:
        response = json(json_.loads(request.body))
        response.cookies["session"] = "secret"
        response.cookies["number"] = "10"
        return response


if __name__ == "__main__":
    app.run(auto_reload=True, port=4000)
