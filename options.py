###############################################################################
# Copyright (C) 2022, created on February 12, 2022
# Written by Justin Ho
#
# This source code is proprietary and without warranty.
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# Inspired from https://sanic.dev/en/guide/how-to/cors.html#options.py
###############################################################################


from collections import defaultdict
from typing import Dict, FrozenSet

from sanic import Sanic, response
from sanic.router import Route

from cors import _add_cors_headers


def _compile_routes_needing_options(
    routes: Dict[str, Route]
) -> Dict[str, FrozenSet]:
    needs_options = defaultdict(list)
    # This is 21.12 and later. You will need to change this for older versions.
    for route in routes.values():
        if "OPTIONS" not in route.methods:
            needs_options[route.uri].extend(route.methods)

    return {
        uri: frozenset(methods) for uri, methods in dict(needs_options).items()
    }


def _options_wrapper(handler, methods):
    def wrapped_handler(request, *args, **kwargs):
        nonlocal methods
        return handler(request, methods)

    return wrapped_handler


async def options_handler(request, methods) -> response.HTTPResponse:
    resp = response.empty()
    _add_cors_headers(resp, methods)
    return resp


def setup_options(app: Sanic, _):
    app.router.reset()

    # app.router.all does not seem to give the most current state of the routes
    # leads to route already existing error
    # needs_options = _compile_routes_needing_options(app.router.all)

    # app.router.groups give the most current state of the routes
    needs_options = _compile_routes_needing_options(app.router.groups)
    for uri, methods in needs_options.items():
        app.add_route(
            _options_wrapper(options_handler, methods),
            uri,
            methods=["OPTIONS"],
        )
    app.router.finalize()
