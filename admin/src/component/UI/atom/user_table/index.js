import React, { useState } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
} from "@mui/material";
import useStyles from "./style";
import SearchBar from "../admin_appbar";
import UserBody from "../user_body";

const StudyInfo = (props) => {
  const classes = useStyles();
  const [currentUser, setCurrent] = useState("React");

  return (
    <Grid>
      <SearchBar
        username={props.username}
        count={props.count}
        lecturers={props.lecturers}
        setUser={props.setUser}
        setCurrent={setCurrent}
        myName={props.myName}
        user={props.user}
      />
      <TableContainer component={Paper} className={classes.paper}>
        <Table
          aria-label="customer week study info"
          className={classes.table}
          size="small"
          sx={{ minWidth: 650 }}
          stickyHeader
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">회차</TableCell>
              <TableCell align="center" className={classes.topic}>
                강의주제
              </TableCell>
              <TableCell align="center">강의진행날짜</TableCell>
            </TableRow>
          </TableHead>
          <UserBody
            username={props.username}
            user={props.user}
            setCount={props.setCount}
            currentUser={currentUser}
            myName={props.myName}
          />
        </Table>
      </TableContainer>
    </Grid>
  );
};

export default StudyInfo;
