"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
app.use(function (req, res, next) {
    console.log("this is middleware");
    next();
});
app.get("/food/hamburger", function (req, res, next) {
    console.log("this is hamburget middleware");
    next();
});
app.get("/food", function (req, res) {
    res.send({ food: app_model_1.Food });
});
app.get("/food/pizza", function (req, res) {
    res.send({ pizza: app_model_1.Food[0] });
});
app.get("/food/hamburger", function (req, res) {
    res.send({ hamburger: app_model_1.Food[2] });
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send("404 Not Found");
});
app.listen(8000, function () {
    console.log("server listening on http://localhost:8000");
});
//# sourceMappingURL=app.js.map