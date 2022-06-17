import React, { useEffect } from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { authCotext } from "../../../shared/context/auth-context";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getStudentId ,getAppByUserId} from "../../../../actions/apps";

import useStyles from "../../../clerks/Dashboard/components/Navbar/Nav_style";
const NavBar = () => {
  const classes = useStyles();
  let tokenUser = false;
  
  let Userid = "";
  if (JSON.parse(localStorage.getItem("userData"))) {
    const { token, userId } = JSON.parse(localStorage.getItem("userData"));
    tokenUser = token;
    Userid = userId;
  }
  const dispatch = useDispatch();

  
  const auth = useContext(authCotext);
  let payment= false,
  re_upload= false,
  newA= false,
  finished = false;


   


console.log(auth)
  useEffect(() => {
    try {
      dispatch(getStudentId(Userid));
      dispatch(getAppByUserId(tokenUser, Userid));

      
    } catch (err) {
      
    }
  },[dispatch]);
 
  const user = useSelector((state) => state.user);
  
  const data = useSelector((state) => state.apps);
  console.log(data);
  if (data.application !=undefined) {
    payment = data.application.payment;
    newA = data.application.new;
    finished = data.application.finished;
    re_upload = data.application.re_upload;
  }
  let name = ""
  if(user.student !== undefined){
    name = user.student.fullName.substring(0, user.student.fullName.indexOf(' ')); 
  }



  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleClose() {
    setAnchorEl(null);
  }
  return (
    <AppBar position="static">
      <CssBaseline />
      <Toolbar>
        <Typography variant="h4" className={classes.logo}>
          <NavLink to="/" className={classes.logo} style={{ float: "left" }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/8/81/UTM-LOGO.png" />
          </NavLink>
          <h6 class="name_head">Hi {name}</h6>
        </Typography>
        <div className={classes.links}>
          <NavLink to="/user" className={classes.link}>
            Home
          </NavLink>

          {!(newA || payment ||re_upload) && (
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              // className="drop_btn"
              className={classes.link}
              onMouseOver={handleClick}
            >
              Applications
            </Button>
          ) 
        }
          {(newA || payment || finished||re_upload) 
           &&(
            <NavLink className={classes.link} to="/progress">
              Progess
            </NavLink>
          )
        }

          <Menu
            className="men"
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            MenuListProps={{ onMouseLeave: handleClose }}
          >
            <MenuItem onClick={handleClose}>
              {" "}
              <NavLink to="/visaApplication">Visa Application</NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              {" "}
              <NavLink to="/ikadApplication">I-kad Application</NavLink>
            </MenuItem>
          </Menu>
          {/* </div> */}

          {/* {(finished || newA || payment || re_upload) && (
            <NavLink className={classes.link} to="/progress">
              Progess
            </NavLink>
          )} */}

          <NavLink className={classes.link} to="/userInfo">
            Personal Info
          </NavLink>
          <NavLink to="/login" className={classes.link} onClick={auth.logout}>
            Logout
          </NavLink>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
