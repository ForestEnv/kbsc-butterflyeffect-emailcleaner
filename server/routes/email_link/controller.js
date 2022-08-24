const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

//import axios from "axios";
const axios = require("axios");

const userServices = require("../../services/user");
const emailServices = require("../../services/email");

// usertable emailtable

exports.connectionEmail = async (req, res, next) => {
  try {
    console.log(req.body);
    const { no, id, email_id, email_Pw } = req.body;
    await userServices.updateIsConnectionEmail(no);
    await emailServices.setEmail({ no, email_id, email_Pw });
    // const isConnectionEmail = await userServices.getIsConnectionEmail(no);
    const response = await axios.post("http://localhost:5000/link", {
      UserName: id,
      Emails: {
        email_address: email_id,
        password: email_Pw,
      },
    });
    const connectionMsg = response.data.success_message;
    console.log("DATA FROM FLASK=" + connectionMsg);
    res.status(CREATED).json({
      message: "이메일 연동 작업!",
      //totalEmailNum,
      connectionMsg,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 연동 실패!",
    });
  }
};
