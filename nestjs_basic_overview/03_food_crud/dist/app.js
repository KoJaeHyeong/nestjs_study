"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_model_1 = require("./app.model");
var app = express();
app.use(function (req, res, next) {
    console.log("this is middleware");
    next();
});
app.use(express.json());
app.get("/foods", function (req, res) {
    try {
        var foods = app_model_1.Food;
        res.send({
            success: true,
            data: {
                foods: foods,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
app.get("/foods/:id", function (req, res) {
    try {
        var params_1 = req.params;
        var foods = app_model_1.Food.find(function (food) {
            return food.id === params_1.id;
        });
        res.send({
            success: true,
            data: {
                foods: foods,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
app.post("/foods", function (req, res) {
    try {
        var data = req.body;
        app_model_1.Food.push(data);
        console.log(data);
        res.send({
            success: true,
            data: { data: data },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
});
app.use(function (req, res, next) {
    console.log("this is error middleware");
    res.send("404 Not Found");
});
app.listen(8000, function () {
    console.log("server listening on http://localhost:8000");
});
//# sourceMappingURL=app.js.map