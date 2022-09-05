import React, { useState } from "react";
import { TableCell, TableRow } from "@mui/material";

const User = (props) => {
  return (
    <>
      <TableRow hover>
        <TableCell align="center">{props.session_no}</TableCell>
        <TableCell align="center">{props.topic}</TableCell>
        <TableCell align="center">{props.studyDate}</TableCell>
      </TableRow>
    </>
  );
};

export default User;
