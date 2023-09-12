"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var port = 8000;
app.get("/s", function (req, res) {
    res.redirect("https://www.naver.com");
});
app.listen(port, function () {
    console.log("Example app listening on http://localhost:" + port);
});
//# sourceMappingURL=app.js.map