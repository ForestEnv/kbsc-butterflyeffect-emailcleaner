const { OK, CREATED, BAD_REQUEST } =
  require("../../config/statusCode").statusCode;

const userServices = require("../../services/user");
const adminServices = require("../../services/admin");
const { createID } = require("../../utils/jwt");
const axios = require("axios");

exports.adminlogin = async (req, res, next) => {
  try {
    const adminuser = req.body;
    const accesstoken = createID(adminuser.id);
    res.status(CREATED).json({
      message: "로그인 성공!",
      adminuser: {
        no: req.user.no,
        id: req.user.id,
      },
      accesstoken,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "로그인 실패!",
    });
  }
};

exports.adminregister = async (req, res, next) => {
  try {
    const { id, name, password } = req.body;
    await adminServices.setadmin({ id, name, password });
    res.status(CREATED).json({
      registerSuccess: true,
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "실패!",
    });
  }
};

exports.updateUserMiles = async (req, res, next) => {
  try {
    await userServices.updateMiles();
    res.status(CREATED).json({
      message: "사용자 마일리지 update!",
    });
  } catch (error) {
    res.status(BAD_REQUEST).json({
      message: "update 실패!",
    });
  }
};
