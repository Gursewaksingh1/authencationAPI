const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth")
router.get("/getUsers", isAuth, userController.getUsers);
router.get("/getUserById", isAuth, userController.getUserById);
router.post("/postUser", userController.postUser);
router.post("/updateUser", isAuth, userController.updateUser);
router.post("/deleteUser",isAuth, userController.deleteUser);
router.post("/loginUser", userController.loginUser);
router.post("/logoutUser", userController.logoutUser);

module.exports = router