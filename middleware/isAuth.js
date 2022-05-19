const jwt = require("jsonwebtoken");

isAuth = async (req, res,) => {
 const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

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