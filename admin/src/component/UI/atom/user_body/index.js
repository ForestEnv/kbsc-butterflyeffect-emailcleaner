import React, { useState, useEffect } from "react";
import { TableBody } from "@material-ui/core";
import axios from "axios";
import User from "../user";

const UserBody = (props) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const lecturerFetchUsers = async () => {
      try {
        setError(null);
        setData(null);
        setLoading(true);
        const response = await axios.get(`/api/instructors/getinfo/`);
        setData(response.data.info);
        props.setCount(response.data.info.length);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    lecturerFetchUsers();
  }, [props.currentLecturer]);
  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!data) return null;

  return (
    <>
      <TableBody>
        {data
          ? data.map((c) => {
              return (
                <User
                  key={c.no}
                  no={c.no}
                  name={c.name}
                  id={c.id}
                  experience={c.experience}
                  miles={c.miles}
                />
              );
            })
          : "해당 게시글을 찾을 수 없습니다."}
      </TableBody>
    </>
  );
};

export default UserBody;
