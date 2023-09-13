"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var foods_model_1 = require("./foods.model");
var express_1 = require("express");
var router = express_1.Router();
router.get("/foods", function (req, res) {
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
});
router.get("/foods/:id", function (req, res) {
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
});
router.post("/foods", function (req, res) {
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
});
exports.default = router;
//# sourceMappingURL=foods.route.js.map