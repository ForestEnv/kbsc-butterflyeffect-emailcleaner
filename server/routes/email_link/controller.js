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
    console.log(email_id);
    console.log(email_Pw);
    await userServices.updateIsConnectionEmail(no);
    console.log("gggg1g");
    await emailServices.setEmail({ no, email_id, email_Pw });
    console.log("gggg2g");
    // const isConnectionEmail = await userServices.getIsConnectionEmail(no);
    const response = await axios.post("http://localhost:5000/link", {
      UserName: id,
      Emails: {
        email_address: email_id,
        password: email_Pw,
      },
    });
    console.log("ggg3gg");
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
