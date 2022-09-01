const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

const userServices = require("../../services/user");
const adminServices = require("../../services/admin");
const axios = require("axios");

exports.adminlogin = async (req, res, next) => {
  try {
    const adminuser = req.body;
    const temp = await userServices.getIsConnectionEmail(req.user.no);
    res.status(CREATED).json({
      message: "관리자 로그인 성공!",
      adminuser: {
        no: req.adminuser.no,
        id: req.adminuser.id,
      },
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "관리자 로그인 실패!",
    });
  }
};

exports.adminregister = async (req, res, next) => {
  try {
    console.log(req);
    const { id, name, password } = req.body;
    await adminServices.setadmin({ id, name, password });
    res.status(CREATED).json({
      message: "연동 성공!",
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "실패!",
    });
  }
};

exports.updateUserMiles = async (req, res, next) => {
  try {
    console.log("-------------1");
    await userServices.updateMiles();
    console.log("-------------2");
    res.status(CREATED).json({
      message: "사용자 마일리지 update!",
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "update 실패!",
    });
  }
};
