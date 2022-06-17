import React, { useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import "./payment_table.css";

import { useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import { getAllStudents, getAllApps } from "../../../../actions/clerk";
import { useSelector } from "react-redux";
function createData(type, status, name, id, uploaded) {
  return { type, status, name, id, uploaded };
}

const PaymentApp = () => {
  const dispatch = useDispatch();

  const rows = [
    // createData('Visa', "New", "Abdalla"),
  ];
  let tokenUser;
  if (JSON.parse(localStorage.getItem("userData"))) {
    const { token } = JSON.parse(localStorage.getItem("userData"));
    console.log(token);
    tokenUser = token;
  }

  useEffect(() => {
    dispatch(getAllApps(tokenUser));
    dispatch(getAllStudents());
    console.log("hi");
  }, [dispatch]);
  const app = useSelector((state) => state.apps);
  const users = useSelector((state) => state.user);

  console.log(users.users);
  console.log(app.applications);
  if (users.users !== undefined && app.applications !== undefined)
    users.users.map((user, index) => {
      app.applications.map((app) => {
        if (user.id === app.creator && app.payment === true) {
          rows.push(
            createData(app.type, "Payment", user.name, user.id, app.payment_upload)
          );
        }
      });
    });

  return (
    <>
      <h1 className="head_table"> Payment Applications</h1>
      <div classname="table_app">
        <TableContainer
          component={Paper}
          style={{
            boxShadow: "none",
            marginTop: 20,
            backgroundColor: "transparent",
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Studnet Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">View</TableCell>
                {/* <TableCell align="right">Protein&nbsp;(g)</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.type}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">
                    <Link
                      style={{ textDecoration: "capitalize !important" }}
                      to={`/student_info/${row.id}`}
                    >
                      {row.name}
                    </Link>{" "}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.type}
                  </TableCell>
                  <TableCell align="center">{row.status}</TableCell>

                  <TableCell align="center">
                    <Link
                      to={`/payment_check/${row.id}`}
                      onClick={(e) =>
                        !row.uploaded ? e.puploadedventDefault() : null
                      }
                    >
                      <Button className="t_btton" disabled={!row.uploaded}>
                        View
                      </Button>
                    </Link>
                  </TableCell>
                  {/* <TableCell align="right">{row.protein}</TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default PaymentApp;
