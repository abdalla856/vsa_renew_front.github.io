import React, { useEffect } from "react";

import NavBar from "../../shared/components/Navigation/NavBar";
import Exclamat from "./components/Exclamat";
// import { Link } from "react-router-dom";
import { Approved } from "./components/approved";
import Error from "./components/Error";
import INProgress from "./components/inprogress";
import "./progress.css";

import { useSelector } from "react-redux";
import { getAppByUserId } from "../../../actions/apps";

import { useDispatch } from "react-redux";

import { useHistory } from "react-router";

const Progress = () => {

  // console.log(auth.app.passport);
  const dispatch = useDispatch();
  // const history = useHistory();
  // const auth = useContext(authCotext);

  let tokenUser = -false;
  let Userid = "";
  if (JSON.parse(localStorage.getItem("userData"))) {
    const { token, userId } = JSON.parse(localStorage.getItem("userData"));
    tokenUser = token;
    Userid = userId;
  }

  useEffect(() => {
    dispatch(getAppByUserId(tokenUser, Userid));
  }, [dispatch,tokenUser, Userid]);

  const data = useSelector((state) => state.apps);
  const app = data.application;

  let finished , payment , payment_upload , re_upload , re_upload_uploads = true ;
if(app !== undefined) {

finished = app.finished;
payment = app.payment;
payment_upload = app.payment_upload;
re_upload = app.re_upload;
re_upload_uploads = app.re_upload_uploads;

}
  console.log(app);

    if (finished === true) {
      return (
        <React.Fragment>
          <NavBar />
          <div className="submitted__cotainer">
            <Approved />
          </div>
        </React.Fragment>
      );
    } else if (payment === true && payment_upload === false) {
      return (
        <React.Fragment>
          <NavBar />
          <div className="submitted__cotainer">
            <Exclamat />
          </div>
        </React.Fragment>
      );
    } else if (re_upload === true && re_upload_uploads === false) {
      return (
        <React.Fragment>
          <NavBar />
          <div className="submitted__cotainer">
            <Error />
          </div>
        </React.Fragment>
      );
    } 
    else {
      return (
        <React.Fragment>
          <NavBar />
          <div className="submitted__cotainer">
            <INProgress />
          </div>
        </React.Fragment>
      );
    }
  
};
export default Progress;
