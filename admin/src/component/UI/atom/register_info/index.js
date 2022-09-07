import React from "react";
import TextField from "@mui/material/TextField";

const RegisterInfo = (props) => {
  return (
    <>
      <TextField
        label="Name"
        placeholder="Enter User Name"
        fullWidth
        required
        onChange={props.nameHandler}
      />
      <TextField
        label="Id"
        placeholder="Enter Id"
        fullWidth
        required
        onChange={props.idHandler}
      />
      <TextField
        label="Password"
        type="password"
        placeholder="Enter Password"
        fullWidth
        required
        onChange={props.passwordHandler}
        error={!props.hasError(props.password)}
        helperText={
          !props.hasError(props.password) ? "8 ~ 10자 영문, 숫자 조합" : null
        }
      />
      <TextField
        label="ConfirmPassword"
        type="password"
        placeholder="Enter ConfirmPassword"
        fullWidth
        required
        onChange={props.confirmPWHandler}
        error={props.hasNotSameError(props.confirmPassword)}
        helperText={
          props.hasNotSameError(props.confirmPassword)
            ? "입력한 비밀번호와 일치하지 않습니다."
            : null
        }
      />
    </>
  );
};

export default RegisterInfo;
