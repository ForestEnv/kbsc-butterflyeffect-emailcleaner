const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

//import axios from "axios";
const axios = require("axios");

const userServices = require("../../services/user");
const emailServices = require("../../services/email");

exports.countEmail = async (req, res, next) => {
  try {
    const { user_no } = req.body;
    console.log(user_no);
    const emailData = await emailServices.getEmail({ user_no });
    console.log("emailData");
    const response = await axios.post("http://localhost:5000/count", {
      Emails: emailData,
    });
    const totalEmailNum = response.data.Result[0].emailCount;
    console.log("DATA FROM FLASK=" + totalEmailNum);
    res.status(CREATED).json({
      message: "이메일 연동 성공!",
      totalEmailNum,
      //isConnectionEmail,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 연동 실패!",
    });
  }
};
