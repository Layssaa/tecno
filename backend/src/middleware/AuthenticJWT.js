require("dotenv").config();
const jwt = require('jsonwebtoken');

async function AuthenticJWT(req, res, next) {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  console.log("=============TOKEN COOKIE VERIFY ===========");
  console.log(token);
  console.log("==========CHAVE=============");
  console.log(process.env.SECRET);
  try {
    jwt.verify( token , process.env.SECRET, function (err, decoded) {
      if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      console.log("============ DECODED ===========");
      console.log(decoded);

      req.token_session = decoded._token;
      console.log("FEITO");
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ "msg": error })
  }


}

module.exports = { AuthenticJWT };