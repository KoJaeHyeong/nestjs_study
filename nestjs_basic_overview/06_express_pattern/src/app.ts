import * as express from "express";
import foodRouter from "./foods/foods.route";

class Server {
  public app: express.Application;

  constructor() {
    const app: express.Application = express();
    this.app = app;
  }

  private setRoute() {
    this.app.use(foodRouter);
  }

  private setMiddleware() {
    // * Logging middleware
    this.app.use((req, res, next) => {
      console.log("this is middleware");
      next(); // middleware 거쳐 다음으로 가기 위함.
    });

    // * json middleware(express에서 제공)
    this.app.use(express.json());

    this.setRoute();

    //* 404 middleware
    this.app.use((req, res, next) => {
      console.log("this is error middleware");
      res.send("404 Not Found");
    });
  }

  public listen() {
    this.setMiddleware();
    this.app.listen(8000, () => {
      console.log(`server listening on http://localhost:8000`);
    });
  }
}

function init() {
  const server = new Server();
  server.listen();
}

init();
