const jwt = require("jsonwebtoken");

isAuth = async (req, res,next) => {
 const token = req.cookies.jwt;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  jwt.verify(token, process.env.SECRET, function (err, data) {
    if (err) {
      return res.status(403).send({ status: "failed", error: err });
    } else {
      req.user = data;
      next();
    }
  });
};

module.exports = isAuth;