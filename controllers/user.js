const User = require("../model/user");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    // fetching all users

    const users = await User.findAll();
    res.send({ status: "success", data: users });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.getUserById = async (req, res) => {
  try {
    //fetching user by id
    const user = await User.findOne({ where: { id: req.query.id } });
    res.send({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.postUser = async (req, res) => {
  try {
    const user = await User.create({
      //creating new user
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
    });
    res.send({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res.send(err.errors);
  }
};

exports.updateUser = async (req, res) => {
  try {
    //updating user
    const user = await User.update(req.body, { where: { id: req.body.id } });
    const status = user == 1 ? "Update success" : " Update failed";
    res.send({ status: status });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    //deleting user
    const user = await User.destroy({ where: { id: req.body.id } });
    const status = user == 1 ? "delete success" : " delete failed";
    res.send({ status: status });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.loginUser = async (req, res) => {
  try {
    //checking if user email and password is correct
    const user = await User.findOne({
      where: {
        [Op.and]: [{ password: req.body.password }, { email: req.body.email }],
      },
    });
    console.log(user);
    if (user !== null) {
      //creating access token
      let token = jwt.sign(
        { userId: user.id, userEmail: user.email },
        process.env.SECRET,
        { expiresIn: "1h" }
      );
      //creating refresh token
      let refreshToken = jwt.sign(
        { userId: user.id, userEmail: user.email },
        process.env.SECRET,
        { expiresIn: "24h" }
      );
      res.send({ status: "success", token, refreshToken });
    } else {
      res.send({ status: "failed", msg: "invaild email or password" });
    }
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    //creating new token for replacing existing one in order to logout
    new_token = jwt.sign(
      { userId: user.id, userEmail: user.email },
      process.env.SECRET,
      {
        expiresIn: "1",
      }
    );

    res.status(200).send({ status: "success", new_token });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    
    const token = req.body.refreshToken;
    //checking if token is empty
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    //decoding token
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    let newToken = jwt.sign(
      //generating new token
      { userId: decoded.userId, userEmail: decoded.userEmail },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.send({ status: "success", newToken });
  } catch (error) {
    res.send({ status: "failed", error: err.errors });
  }
};
