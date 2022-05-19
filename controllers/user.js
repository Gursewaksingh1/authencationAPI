const User = require("../model/user");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send({ status: "success", data: users });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.query.id } });
    res.send({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res.send({ status: "failed", error: err.errors });
  }
};

exports.postUser = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
    });
    res.send({ status: "success", data: user });
  } catch (err) {
    console.log(err);
    res.send(err.errors[0].message);
  }
};

exports.updateUser = async (req, res) => {
  try {
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
      const user = await User.findOne({
        where: {
          [Op.and]: [
            { password: req.body.password },
            { email: req.body.email },
          ],
        },
      });
      console.log(user);
      if (user !== null) {
        let token = jwt.sign(
          { userId: user.id, userEmail: user.email },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        res.cookie('jwt',token,{httpOnly:true, maxAge:100000})
        res.send({ status: "success", msg:"login successFull"});
      } else {
        res.send({ status: "failed", msg: "invaild email or password" });
      }
  
  } catch (err) {
      console.log(err);
      res.send({ status: "failed", error: err.errors });
  }
};

exports.logoutUser = async(req,res) =>{
    try {
          res.cookie.jwt=""
        res.status(200).send('res');

    } catch (err) {
       console.log(err); 
       res.send({ status: "failed", error: err.errors });
     }
}
function errMsg(obj) {}
