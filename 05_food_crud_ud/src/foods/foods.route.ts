import { Food, FoodType } from "./foods.model";
import { Router } from "express";

const router = Router(); // * 인스턴스 생성(router) => 코드를 분리할때, router(미들웨어 같은 개념)를 사용하여 연결 시켜 준다.

// * Read Food 전체 data 조회
router.get("/foods", (req, res) => {
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
});

// * Read 특정 Food data 조회
// * 동적 라우팅
router.get("/foods/:id", (req, res) => {
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
});

// * CREATE new Food 추가 API
router.post("/foods", (req, res) => {
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
});

// * 전체 UPDATE Food data => PUT
router.put("/foods/:id", (req, res) => {
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
});

// * 부분 UPDAT Food data => PATCH
router.patch("/foods/:id", (req, res) => {
  try {
    const params = req.params;
    const body = req.body;
    let result: any;

    Food.forEach((food) => {
      if (food.id === params.id) {
        food = { ...food, ...body }; // * 원래 있던 데이터를 구조 분해 시켜서 새로운 데이터와 일치하는 key값을 수정해준다.

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
});

// * DELETE Food data => DELELTE
router.delete("/foods/:id", (req, res) => {
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
});

export default router;
