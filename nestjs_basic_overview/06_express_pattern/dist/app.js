"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var foods_route_1 = require("./foods/foods.route");
var Server = (function () {
    function Server() {
        var app = express();
        this.app = app;
    }
    Server.prototype.setRoute = function () {
        this.app.use(foods_route_1.default);
    };
    Server.prototype.setMiddleware = function () {
        this.app.use(function (req, res, next) {
            console.log("this is middleware");
            next();
        });
        this.app.use(express.json());
        this.setRoute();
        this.app.use(function (req, res, next) {
            console.log("this is error middleware");
            res.send("404 Not Found");
        });
    };
    Server.prototype.listen = function () {
        this.setMiddleware();
        this.app.listen(8000, function () {
            console.log("server listening on http://localhost:8000");
        });
    };
    return Server;
}());
function init() {
    var server = new Server();
    server.listen();
}
init();
//# sourceMappingURL=app.js.map