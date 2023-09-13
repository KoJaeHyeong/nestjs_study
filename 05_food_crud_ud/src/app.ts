import * as express from "express";
import foodRouter from "./foods/foods.route";

const app: express.Express = express();

// * Logging middleware
app.use((req, res, next) => {
  console.log("this is middleware");
  next(); // middleware 거쳐 다음으로 가기 위함.
});

// * json middleware(express에서 제공)
app.use(express.json());

app.use(foodRouter);

//* 404 middleware
app.use((req, res, next) => {
  console.log("this is error middleware");
  res.send("404 Not Found");
});

app.listen(8000, () => {
  console.log(`server listening on http://localhost:8000`);
});
