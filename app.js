const express = require("express");
const app = express();
const sequelize = require("./db");
const bodyparser = require("body-parser");
const userRouter = require("./router/user");
 const User = require("./model/user")
 const dotenv = require("dotenv");
 const cookieParser = require("cookie-parser");
 dotenv.config();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);

sequelize.sync().then(res => {
    // console.log(res)
}).catch(err => {
    console.log(err);
})

app.listen(PORT);
