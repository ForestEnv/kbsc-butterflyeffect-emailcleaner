const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

const userServices = require("../../services/user");
const emailServices = require("../../services/email");

const axios = require("axios");

exports.connectionEmail = async (req, res, next) => {
  try {
    const { no, id, email, emailPassword } = req.body;
    
    await userServices.updateIsConnectionEmail(no);
    await emailServices.setEmail({ no, email, emailPassword });
    
    const isConnectionEmail = await userServices.getIsConnectionEmail(no);
    
    const response = await axios.post("http://localhost:5000/link", {
      UserName: id,
      Emails: {
        email_address: email,
        password: emailPassword,
      },
    });
    
    const connectionMsg = response.data.success_message;
    res.status(CREATED).json({
      message: "이메일 연동 작업!",
      isConnectionEmail,
      connectionMsg,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 연동 실패!",
    });
  }
};

exports.connectionAddEmail = async (req, res, next) => {
  try {
    console.log(req.body);
    const { no, id, email_id, email_Pw } = req.body;
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

exports.countEmail = async (req, res, next) => {
  try {
    const { no } = req.params;
    const emailData = await emailServices.getEmail(no);
    console.log('SERVER', emailData);
    const response = await axios.post("http://localhost:5000/count", {
      Emails: emailData,
    });
    const email = response.data.Result[0].email_address;
    const emailCount = response.data.Result[0].emailCount;
    console.log('EMAILCOUNT', emailCount);
    res.status(OK).json({
      email,
      emailCount
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 개수 조회 실패!",
    });
  }
};

exports.predictEmail = async (req, res, next) => {
  const { user_no, email_id } = req.body;
  const email_info = await emailServices.getEmailInfo({ user_no, email_id });
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      Emails: {
        email_address: email_id,
        password: email_info.dataValues.email_Pw,
      },
    });
    res.status(CREATED).json({ result: response.data });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 스캔 실패!",
    });
  }
};

exports.deleteEmail = async (req, res, next) => {
  const { user_no, email_id, list } = req.body;
  const email_info = await emailServices.getEmailInfo({
    user_no,
    email_id,
  });
  //await emailServices.setDeleteEmail({ Emails, deleteDate, emailLen });
  try {
    const response = await axios.post("http://127.0.0.1:5000/delete", {
      Emails: {
        email_address: email_id,
        password: email_info.dataValues.email_Pw,
        list,
      },
    });
    await userServices.updateExperience({
      user_no,
      emailLen: response.data.emailLen,
    });
    await emailServices.updateTotalNum({
      email_no: email_info.dataValues.no,
      emailLen: response.data.emailLen,
    });

    res.status(CREATED).json({ result: response.data.emailLen });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};

exports.getDeleteNumber = async (req, res, next) => {
  try{
    const { no } = req.params;
    const result = await emailServices.getDeleteNumber(no);
    console.log('삭제된 이메일 수:'+ result);
    const deleteNum = result.total_no;
    res.status(OK).json({
      deleteNum
    })
  }catch(error){
    res.status(BAD_REQUEST).json({
      message: "삭제된 이메일 수 조회 실패!"
    })
  }
};