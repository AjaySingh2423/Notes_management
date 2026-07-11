const express=require("express");
const app=express();
const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, ".env")
});
const cookieParser = require("cookie-parser");
const {connectMongoDB} = require('./connection');
app.use(express.static(path.join(__dirname, "public")));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

connectMongoDB(process.env.MONGO_URI)
.then(()=>console.log("Mongobd connected"));


app.use(express.json());
app.use(express.urlencoded({ extended:false}));  //It is a middleware
app.use(cookieParser());

app.get("/", (req, res) => {
    res.redirect("/login");
});


const userRouter = require("./routes/user");
app.use(userRouter);

app.listen(process.env.PORT, ()=> console.log("Server Started"));