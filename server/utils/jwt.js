const jwt = require("jsonwebtoken");

const { JWT_ACCESS_TOKEN_SECRET } = process.env;

exports.createJwtAccessToken = (data) => {
  console.log("debug test");
  console.log("*************2");
  const token = jwt.sign({ id: data }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  return token;
};

exports.createID = (data) => {
  console.log("debug test");
  console.log("*************1");
  const token = jwt.sign({ id: data }, JWT_ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });
  console.log(token);
  return token;
};
