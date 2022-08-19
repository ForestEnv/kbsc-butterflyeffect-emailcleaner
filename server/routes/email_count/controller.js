const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

//import axios from "axios";
const axios = require("axios");

const userServices = require("../../services/user");
const emailServices = require("../../services/email");

/** 
    POST: 이메일 연동을 위한 Flask 서버 통신 API
    *@author 이현탁 <leeht620@gmail.com>
    *@requires module:axios
    * express가 client로서 flask에 요청을 보냄
    * axios 라이브러리를 사용해 flask와 통신
    * client(React Native)로부터 연동 이메일 주소, 비밀번호, 사용자 이름을 받음
    * express는 client로부터 받은 데이터를 다시 post방식으로 flask에 데이터 요청
    * flask로 부터 받은 데이터를 response에 저장해 React Native로 전송
    * flask 포트 번호: 5000
*/
exports.countEmail = async (req, res, next) => {
  try {
    const { no, id, email, emailPassword } = req.body;
    await userServices.updateIsConnectionEmail(no);
    await emailServices.setEmail({ no, email, emailPassword });
    const isConnectionEmail = await userServices.getIsConnectionEmail(no);
    const response = await axios.post("http://localhost:5000/count", {
      UserName: id,
      Emails: [
        {
          email_address: email,
          password: emailPassword,
        },
      ],
    });
    const totalEmailNum = response.data.Result[0].emailCount;
    console.log("DATA FROM FLASK=" + totalEmailNum);
    res.status(CREATED).json({
      message: "이메일 연동 성공!",
      //totalEmailNum,
      isConnectionEmail,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 연동 실패!",
    });
  }
};
