"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFoods = exports.updatePartialFoods = exports.updateFoods = exports.createFoods = exports.readAllFoods = exports.readFood = void 0;
var foods_model_1 = require("./foods.model");
var readAllFoods = function (req, res) {
    try {
        var foods = foods_model_1.Food;
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
};
exports.readAllFoods = readAllFoods;
var readFood = function (req, res) {
    try {
        var params_1 = req.params;
        var foods = foods_model_1.Food.find(function (food) {
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
};
exports.readFood = readFood;
var createFoods = function (req, res) {
    try {
        var data = req.body;
        foods_model_1.Food.push(data);
        console.log("data", data);
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
};
exports.createFoods = createFoods;
var updateFoods = function (req, res) {
    try {
        var params_2 = req.params;
        var body_1 = req.body;
        var result_1;
        foods_model_1.Food.forEach(function (food) {
            if (food.id === params_2.id) {
                food = body_1;
                result_1 = food;
            }
        });
        res.send({
            success: true,
            data: {
                food: result_1,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
};
exports.updateFoods = updateFoods;
var updatePartialFoods = function (req, res) {
    try {
        var params_3 = req.params;
        var body_2 = req.body;
        var result_2;
        foods_model_1.Food.forEach(function (food) {
            if (food.id === params_3.id) {
                food = __assign(__assign({}, food), body_2);
                result_2 = food;
            }
        });
        res.send({
            success: true,
            data: {
                food: result_2,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
};
exports.updatePartialFoods = updatePartialFoods;
var deleteFoods = function (req, res) {
    try {
        var params_4 = req.params;
        var newFoods = foods_model_1.Food.filter(function (food) { return food.id !== params_4.id; });
        console.log("newFoods", newFoods);
        res.send({
            success: true,
            data: {
                food: newFoods,
            },
        });
    }
    catch (err) {
        res.status(400).send({
            success: false,
            error: err.message,
        });
    }
};
exports.deleteFoods = deleteFoods;
//# sourceMappingURL=foods.service.js.map