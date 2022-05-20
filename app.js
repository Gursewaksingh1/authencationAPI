const express = require("express");
const app = express();
const sequelize = require("./db");
const bodyparser = require("body-parser");
const userRouter = require("./router/user");
const User = require("./model/user");
const multer = require("multer");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/image");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
  
});
const fileFilter=(req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      console.log("Only .png, .jpg and .jpeg format allowed!");
    //   return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  }
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.static("public"));
app.use(multer({ storage: storage,fileFilter }).single("image"));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", ["*"]);
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/user", userRouter);

sequelize
  .sync()
  .then((res) => {
    // console.log(res)
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(PORT);
