import * as express from "express";
import { nextTick } from "process";
import { Food, FoodType } from "./app.model";

const app: express.Express = express();

// * Logging middleware
app.use((req, res, next) => {
  console.log("this is middleware");
  next(); // middleware 거쳐 다음으로 가기 위함.
});

// * json middleware(express에서 제공)
app.use(express.json());

// * Read Food 전체 data 조회
app.get("/foods", (req, res) => {
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
app.get("/foods/:id", (req, res) => {
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
app.post("/foods", (req, res) => {
  try {
    const data = req.body; // express에서는 body를 읽을수 있는 기능을 추가해줘야 함. (express json)
    Food.push(data); // create

    console.log(data);

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

//* 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send("404 Not Found");
});

app.listen(8000, () => {
  console.log(`server listening on http://localhost:8000`);
});
