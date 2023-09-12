import * as express from "express";

const app: express.Express = express();

const port: number = 8000;

app.get("/s", (req: express.Request, res: express.Response) => {
  // res.send("Hello World!");
  // res.send({ hi: "hello" });
  // res.redirect(200, "https://naver.com");
  // const result = res.status(200).json({ result: "this is result" });
  res.redirect("https://www.naver.com");
});

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
