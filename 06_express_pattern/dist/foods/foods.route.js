"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var foods_service_1 = require("./foods.service");
var router = express_1.Router();
router.get("/foods", foods_service_1.readAllFoods);
router.get("/foods/:id", foods_service_1.readFood);
router.post("/foods", foods_service_1.createFoods);
router.put("/foods/:id", foods_service_1.updateFoods);
router.patch("/foods/:id", foods_service_1.updatePartialFoods);
router.delete("/foods/:id", foods_service_1.deleteFoods);
exports.default = router;
//# sourceMappingURL=foods.route.js.map