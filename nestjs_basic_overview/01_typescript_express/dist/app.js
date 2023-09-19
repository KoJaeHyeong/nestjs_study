"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8000;
app.get("/s", function (req, res) {
    res.send({ hi: "hello" });
    res.redirect(200, "https://naver.com");
});
app.post("/s", function (req, res) {
    res.send({ name: "jaehyeong" });
});
app.listen(port, function () {
    console.log("Example app listening on http://localhost:" + port);
});
//# sourceMappingURL=app.js.map