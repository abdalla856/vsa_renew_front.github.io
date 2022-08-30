import React from"react";
import { 
    AppBar ,
    Toolbar ,
    CssBaseline,
    Typography,
    
} from '@material-ui/core'

import useStyles from'./Nav_style'
import {NavLink} from "react-router-dom"

import { useContext } from "react";
import { authCotext } from "../../../../shared/context/auth-context";

function Navbar() {
    const classes = useStyles();
    const auth = useContext(authCotext);
    return (
      <AppBar position="static">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h4" className={classes.logo}>
          <NavLink to ="/clerk_dash" className={classes.logo}>
            UTM Clerks System
            </NavLink>
          </Typography>
            <div className={classes.links}>
              <NavLink to ="/newapp" className={classes.link}>
                New Applications
              </NavLink>
              <NavLink to="/paymentc"  className={classes.link}>
                Payment 
              </NavLink>
              <NavLink to="/reupload" className={classes.link}>
                Re_upload
              </NavLink>
              <NavLink  to ="/approved"className={classes.link}>
                Approved Applications
              </NavLink>
              <button  onClick={auth.logout} className={classes.link}>
              Logout
            </button>
            </div>
        </Toolbar>
      </AppBar>
    );
  }
  export default Navbar;
  