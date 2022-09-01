import React, { useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import Swal from "sweetalert2";
import useStyles from "./style";

const LoginPage = (props) => {
  const [id, setUserId] = useState("");
  const [password, setUserPw] = useState("");

  const classes = useStyles();

  /*EventHandler*/
  const onIdHandler = (e) => {
    setUserId(e.currentTarget.value);
  };
  const onPasswordHandler = (e) => {
    setUserPw(e.currentTarget.value);
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    let data = {
      id: id,
      password: password,
    };
    axios
      .post("/api/admin/login", data)
      .then((response) => {
        const isSuccess = response.data.loginSuccess;
        //추후에 서버측에서 오류메세지 오면 성공여부에따른 알림 출력을 위해
        //만약 isSuccess가 false이면 그에 맞는 서버 측에서의 중복여부 오류문자 수신후 출력 예정
        if (isSuccess) {
          const userTypeRes = response.data.userType;
          Swal.fire({
            icon: "success",
            title: "SUCCESS!",
            text: "성공하셨습니다.",
          }).then(() => {
            if (userTypeRes === "lecturer") {
              props.history.push("/lecturer");
            } else if (userTypeRes === "learner") {
              props.history.push("/learner");
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "로그인에 실패하셧습니다.",
        });
      });
  };
  return (
    <Grid>
      <form onSubmit={onSubmitHandler}>
        <Paper elevation={10} className={classes.paper}>
          <Grid align="center">
            <Avatar className={classes.avatar}>
              <EmojiPeopleIcon className={classes.icon} />
            </Avatar>
            <h2>SIGN IN</h2>
          </Grid>
          <TextField
            label="User Id"
            placeholder="Enter UserId"
            fullWidth
            required
            onChange={onIdHandler}
            className={classes.id}
          />
          <TextField
            label="Password"
            type="password"
            placeholder="Enter Password"
            fullWidth
            required
            onChange={onPasswordHandler}
            className={classes.password}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            fullWidth
            className={classes.button}
          >
            SIGN IN
          </Button>
        </Paper>
      </form>
    </Grid>
  );
};

export default LoginPage;
