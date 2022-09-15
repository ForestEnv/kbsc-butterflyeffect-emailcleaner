const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

const userServices = require("../../services/user");
const emailServices = require("../../services/email");
const deleteServices = require("../../services/delete");

const axios = require("axios");

exports.connectionEmail = async (req, res, next) => {
  try {
    const { no, id, email_id, email_Pw } = req.body;
    await userServices.updateIsConnectionEmail(no);
    await emailServices.setEmail({ no, email_id, email_Pw });
    const isConnectionEmail = await userServices.getIsConnectionEmail(no);
    const response = await axios.post("http://localhost:5000/link", {
      UserName: id,
      Emails: {
        email_address: email_id,
        password: email_Pw,
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
    const { user_no } = req.params;
    const emailData = await emailServices.getEmail({ user_no });
    const response = await axios.post("http://localhost:5000/count", {
      Emails: emailData,
    });
    res.status(CREATED).json({
      message: "이메일 연동 성공!",
      Ressult: response.data.Result,
      //isConnectionEmail,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 연동 실패!",
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
    res.status(CREATED).send(response.data);
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};

exports.deleteEmail = async (req, res, next) => {
  const { user_no, email_id, list } = req.body;
  const email_info = await emailServices.getEmailInfo({
    user_no,
    email_id,
  });
  const total_no = await emailServices.getTotalNum({ user_no });
  try {
    const response = await axios.post("http://127.0.0.1:5000/delete", {
      Emails: {
        email_address: email_id,
        password: email_info.dataValues.email_Pw,
        user_no,
        email_no: email_info.dataValues.no,
        list,
        total_no,
      },
    });
    await deleteServices.setDeleteEmails(response.data.Emails);
    // await deleteServices.setDeleteEmails({response.data.Emails})
    await userServices.updateExperience({
      user_no,
      userPoint: response.data.userPoint,
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

exports.showDeleteEmail = async (req, res, next) => {
  try {
    let user_no = req.params.user_no;
    const Emails = await deleteServices.getDeleteEmails(user_no);
    res.status(CREATED).json({ result: Emails });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};

exports.restoreEmailList = async (req, res, next) => {
  const { user_no, email_id, email_no, list } = req.body;
  const result = await deleteServices.removeDeleteEmails({
    email_no,
    list,
  });
  try {
    const response = await axios.post("http://127.0.0.1:5000/restore", {
      Emails: {
        email_address: email_id,
        list: result.emailList,
      },
    });
    await userServices.declineExperience({
      user_no,
      emailsLen: result.emailLen,
    });
    await emailServices.declineTotalNum({
      email_no,
      emailsLen: result.emailLen,
    });
    res.status(CREATED).json({
      success_message: response.data.success_message,
      //emailList: result.emailList,
      emailsLen: result.emailLen,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "연동 실패!",
    });
  }
};

exports.getDeleteNumber = async (req, res, next) => {
  try {
    const { no } = req.params;
    const result = await emailServices.getDeleteNumber(no);
    const deleteNum = result.total_no;
    res.status(OK).json({
      deleteNum,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "조회 실패!",
    });
  }
};

exports.getEmailId = async (req, res, next) => {
  try {
    const { user_no } = req.params;
    const result = await emailServices.getEmailId(user_no);
    const email_id = result.email_id;
    res.status(OK).json({
      email_id,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "이메일 아이디 조회 실패!",
    });
  }
};
