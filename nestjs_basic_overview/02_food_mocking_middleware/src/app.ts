import * as express from "express";
import { nextTick } from "process";
import { Food, FoodType } from "./app.model";

const app: express.Express = express();

// express 미들웨어는 위에서 차례로 실행되기 때문에 미들웨어를 유연하게 세팅해줄수 있음.
// next는 말 그래도 next 라우터를 거치게 해준다.
// app.use 는 전체적으로 캐치해주기 위함.
app.use((req, res, next) => {
  console.log("this is middleware");
  next(); // middleware 거쳐 다음으로 가기 위함.
});

//특정 라우터에 대해서만 middleware
app.get("/food/hamburger", (req, res, next) => {
  console.log("this is hamburget middleware");
  next();
});

app.get("/food", (req: express.Request, res: express.Response) => {
  res.send({ food: Food });
});

app.get("/food/pizza", (req: express.Request, res: express.Response) => {
  res.send({ pizza: Food[0] });
});

app.get("/food/hamburger", (req: express.Request, res: express.Response) => {
  res.send({ hamburger: Food[2] });
});

// 에러에 대한 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send("404 Not Found");
});

app.listen(8000, () => {
  console.log(`server listening on http://localhost:8000`);
});
