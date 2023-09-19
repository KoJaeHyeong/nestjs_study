import { Food, FoodType } from "./foods.model";
import { Router } from "express";
import {
  createFoods,
  deleteFoods,
  readAllFoods,
  readFood,
  updateFoods,
  updatePartialFoods,
} from "./foods.service";

const router = Router();

router.get("/foods", readAllFoods);
router.get("/foods/:id", readFood);
router.post("/foods", createFoods);
router.put("/foods/:id", updateFoods);
router.patch("/foods/:id", updatePartialFoods);
router.delete("/foods/:id", deleteFoods);

export default router;
