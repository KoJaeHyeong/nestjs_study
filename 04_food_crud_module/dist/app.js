"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var foods_route_1 = require("./foods/foods.route");
var app = express();
app.use(function (req, res, next) {
    console.log("this is middleware");
    next();
});
app.use(express.json());
app.use(foods_route_1.default);
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send("404 Not Found");
});
app.listen(8000, function () {
    console.log("server listening on http://localhost:8000");
});
//# sourceMappingURL=app.js.map