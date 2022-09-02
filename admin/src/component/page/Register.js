import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Swal from "sweetalert2";
import RegisterInfo from "../UI/atom/register_info";
import useStyles from "./style";

const RegisterPage = (props) => {
  const classes = useStyles();
  const [name, setUserNameReg] = useState(null);
  const [id, setUserIdReg] = useState(null);
  const [password, setUserPwReg] = useState(null);
  const [confirmPassword, setUserConfirmPWReg] = useState(null);

  /*Event Handler*/
  const nameHandler = (e) => {
    setUserNameReg(e.currentTarget.value);
  };
  const idHandler = (e) => {
    setUserIdReg(e.currentTarget.value);
  };
  const passwordHandler = (e) => {
    setUserPwReg(e.currentTarget.value);
  };
  const confirmPWHandler = (e) => {
    setUserConfirmPWReg(e.currentTarget.value);
  };

  const hasError = (passwordEntered) => {
    var regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/; //  8 ~ 10자 영문, 숫자 조합
    return regExp.test(password); // 형식에 맞는 경우 true 리턴
  };
  const hasNotSameError = (passwordEntered) =>
    password && password !== confirmPassword ? true : false;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("비밀번호가 일치하지 않습니다.");
    }
    if (!hasError) {
      return alert("비밀번호가 형식에 맞지 않습니다.");
    }
    let data = {
      id: id,
      name: name,
      password: password,
    };
    axios
      .post("api/admin/register", data)
      .then((response) => {
        const isSuccess = response.data.registerSuccess;
        console.log(isSuccess);
        if (isSuccess) {
          //성공
          Swal.fire({
            icon: "success",
            title: "SUCCESS!",
            text: "성공하셨습니다.",
          }).then(props.history.push("/Login"));
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "회원가입에 실패하셧습니다.",
        });
      });
  };
  return (
    <form onSubmit={submitHandler}>
      <Paper elevation={10} className={classes.registerPaper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <MenuIcon className={classes.icon} />
          </Avatar>
          <h2>Admin Sign Up</h2>
        </Grid>
        <RegisterInfo
          nameHandler={nameHandler}
          idHandler={idHandler}
          password={password}
          confirmPassword={confirmPassword}
          passwordHandler={passwordHandler}
          hasError={hasError}
          confirmPWHandler={confirmPWHandler}
          hasNotSameError={hasNotSameError}
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          fullWidth
          className={classes.signinButton}
        >
          Sign
        </Button>
      </Paper>
    </form>
  );
};

export default RegisterPage;
