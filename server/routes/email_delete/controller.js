const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;
const axios = require("axios");

exports.deleteEmail = async (req, res, next) => {
  const { UserName, email_address, password, list } = req.body;
  console.log("hhh");
  try {
    const response = await axios.post("http://127.0.0.1:5000/delete", {
      UserName: "username",
      Emails: {
        email_address: "huiyeolyun98@gmail.com",
        password: "qijfcpnjgmurwvfv",
        list: [0, 1],
      },
    });
    console.log(response.data);
    res.status(CREATED).json({ result: response.emailCount });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};
