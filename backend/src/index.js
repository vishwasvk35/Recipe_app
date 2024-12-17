"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
;
var cors_1 = require("cors");
var app = express();
app.use(express.json()); //convert the body of request and response into json
app.use((0, cors_1.default)()); //used to avoid security related errors
app.get('/', function (req, res) {
    res.send('Server is working!');
}); //test code to check if everything is working properly
app.listen(5000, function () {
    console.log("running on port: 5000");
});
