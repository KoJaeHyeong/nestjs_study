import { Request, Response } from "express";
import { Food, FoodType } from "./foods.model";

// * Read Food 전체 data 조회
const readAllFoods = (req: Request, res: Response) => {
  try {
    const foods = Food;
    res.send({
      success: true,
      data: {
        foods,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// * Read 특정 Food data 조회
const readFood = (req: Request, res: Response) => {
  try {
    const params = req.params;

    const foods = Food.find((food) => {
      return food.id === params.id;
    });

    res.send({
      success: true,
      data: {
        foods,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// * CREATE new Food 추가 API
const createFoods = (req: Request, res: Response) => {
  try {
    const data = req.body; // express에서는 body를 읽을수 있는 기능을 추가해줘야 함. (express json)
    Food.push(data); // create

    console.log("data", data);

    res.send({
      success: true,
      data: { data },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// * 전체 UPDATE Food data => PUT
const updateFoods = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result: any;

    Food.forEach((food) => {
      if (food.id === params.id) {
        food = body;
        result = food;
      }
    });

    res.send({
      success: true,
      data: {
        food: result,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// * 부분 UPDAT Food data => PATCH
const updatePartialFoods = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const body = req.body;
    let result: any;

    Food.forEach((food) => {
      if (food.id === params.id) {
        food = { ...food, ...body };

        result = food;
      }
    });

    res.send({
      success: true,
      data: {
        food: result,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

// * DELETE Food data => DELELTE
const deleteFoods = (req: Request, res: Response) => {
  try {
    const params = req.params;
    const newFoods = Food.filter((food) => food.id !== params.id);

    console.log("newFoods", newFoods);

    res.send({
      success: true,
      data: {
        food: newFoods,
      },
    });
  } catch (err: any) {
    res.status(400).send({
      success: false,
      error: err.message,
    });
  }
};

export {
  readFood,
  readAllFoods,
  createFoods,
  updateFoods,
  updatePartialFoods,
  deleteFoods,
};
