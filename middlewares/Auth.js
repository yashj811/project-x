const jwt = require("jsonwebtoken");

const JWT_KEY = process.env.JWT_KEY.replace(/\\n/gm, "\n");

const auth = (req, res, next) => {
  const token = req.headers["x-auth-token"];

  if (!token) {
    return res
      .status(401)
      .json({ status: 401, success: false, message: "Unauthorised." });
  }

  try {
    const decoded = jwt.verify(token, JWT_KEY);
    req.user = decoded;
  } catch (error) {
    return res.status(400).json({
      status: 400,
      success: false,
      message: "Token invalid or expired.",
    });
  }
  return next();
};

module.exports = auth;
