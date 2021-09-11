const express = require("express")
const path = require("path") //built-in node.js module

//initialise express app
const app= express(); //third-prty module

const router = require("./router")

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "hbs");

app.use("/", router);

app.listen(3000, () => {
    console.log("The server is running on port 3000")
})