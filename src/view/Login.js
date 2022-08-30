import React, { useContext, useState, useEffect } from "react";
import "./Login.css";
import { anime } from "react-anime";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
// import Card from '../view/shared/components/UIElements/Card'

// import leftBox from "./Login/left side/components/leftBox";
import { LoginStudent } from "../actions/apps";

import { authCotext } from "./shared/context/auth-context";


// import Button from './shared/components/FormElements/Button'
// import {Container ,Row} from 'react-bootstrap'

const Login = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({ matric: "", password: "" });
  const [checkLoggedIn, setcheckLoggedIn] = useState(true);
  const auth = useContext(authCotext);
  const history = useHistory();
  const user = useSelector((state) => state.user);
  console.log(userInfo);
  const { userinfo } = user;

  let current = null;
  useEffect(() => {
    if (userinfo) {
      console.log(userinfo.user._id);
      auth.type = userinfo.user.type;
      auth.login(userinfo.user._id, userinfo.token, userinfo.user.type);

      history.push("/user");
      console.log(auth);
    }
  }, [userinfo, history]);
  const passAnimation = () => {
    if (current) current.pause();
    current = anime({
      targets: "path",
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: "240 1386",
        duration: 700,
        easing: "easeOutQuart",
      },
    });
  };

  const emailAnimation = () => {
    if (current) current.pause();
    current = anime({
      targets: "path",
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: "240 1386",
        // 1386
        duration: 700,
        easing: "easeOutQuart",
      },
    });
  };
  const submitAnimation = () => {
    if (current) current.pause();
    current = anime({
      targets: "path",
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: "easeOutQuart",
      },
      strokeDasharray: {
        value: "530 1386",
        duration: 700,
        easing: "easeOutQuart",
      },
    });
  };

  const authSubmitHandler = (event) => {
    // event.preventDefault();
    try {
      dispatch(LoginStudent(userInfo));
      console.log(checkLoggedIn);

      setcheckLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div classNameName="page">
      <div className="container">
        <div className="left">
          <div className="login">Login</div>
          <div className="eula">
            By logging in you will have acess to international students serivce
            organization for visa renewal application.{" "}
          </div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                inkscapeCollect="always"
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#ff00ff" offset="0%" id="stop876" />
                <stop stopColor="#ff0000" offset="1" id="stop878" />
              </linearGradient>
            </defs>
            {checkLoggedIn ? (
              <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
            ) : (
              <path d="m 40,139.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
            )}{" "}
          </svg>
          <form className="login__form" onSubmit={authSubmitHandler}>
            {!checkLoggedIn ? (
              <div id="error" style={{ "padding-right": "16px" }}>
                Incorrect, Try again
              </div>
            ) : null}
            <label for="email">Matric Number</label>
            <input
              type="text"
              id="email"
              onFocus={emailAnimation}
              onChange={(e) => {
                setUserInfo({ ...userInfo, matric: e.target.value });
              }}
            ></input>
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              onFocus={passAnimation}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            ></input>
            <Link to={checkLoggedIn ? "/login" : "/user"}>
              <input
                type="submit"
                id="submit"
                value="Login"
                onFocus={submitAnimation}
                onClick={authSubmitHandler}
              ></input>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
