import React, { useState, useEffect } from "react";
import User from "./User";
//ส่วนของ libary mui
import {
  Button,
  Paper,
  Avatar,
  Link,
  ButtonGroup,
  Typography,
  Container,
  Box,
  CssBaseline,
} from "@mui/material";
//SweetAlert2 & Navigate
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

// ตารางTable
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

export default function User1() {
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserGet();
  }, []);

  const UserGet = () => {
    fetch("https://www.melivecode.com/api/users")
      .then((res) => res.json())
      .then((result) => {
        setUsers(result);
      });
  };
  // apu user update
  const UserUpdate = (id) => {
    navigate("/Update/" + id);
  };
  // api delete
  const UserDelete = (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      id: id,
    });

    var requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.melivecode.com/api/users/delete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.status === "ok") {
          UserGet();

          // libary alert แจ้งเตือน
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "success",
          });
        } else {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: "error",
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <User />
      <Container maxWidth="lg" sx={{ p: 2 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Box display="flex">
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                User
              </Typography>
            </Box>
            <Box>
              <Link href="Create" underline="hover">
                <Button variant="contained">Create</Button>
              </Link>
            </Box>
          </Box>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>UserName</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell align="center">
                      <Box dispaly="flex" justifyContent="center">
                        <Avatar src={row.avatar} />
                      </Box>
                    </TableCell>
                    <TableCell>{row.fname}</TableCell>
                    <TableCell>{row.lname}</TableCell>
                    <TableCell>{row.username}</TableCell>
                    <TableCell>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <Button onClick={() => UserUpdate(row.id)}>
                          Update
                        </Button>
                        <Button onClick={() => UserDelete(row.id)}>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
