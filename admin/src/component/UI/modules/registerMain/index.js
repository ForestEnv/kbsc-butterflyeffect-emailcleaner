import React from "react";
import { Link } from "react-router-dom";
import useStyles from "./style";
import { Button, Grid, Paper, Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Main = () => {
  const classes = useStyles();
  return (
    <Grid container spacing={2}>
      <Paper elevation={10} className={classes.paper}>
        <Grid align="center">
          <Avatar className={classes.avatar}>
            <HomeIcon className={classes.icon} />
          </Avatar>
          <h2>Home</h2>
        </Grid>
        <Grid item>
          <Button
            size="large"
            component={Link}
            to="/login"
            className={classes.lecturerButton}
            variant="contained"
          >
            로그인
          </Button>

          <Button
            size="large"
            component={Link}
            to="/register"
            className={classes.learnerButton}
            variant="contained"
          >
            회원가입
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Main;
