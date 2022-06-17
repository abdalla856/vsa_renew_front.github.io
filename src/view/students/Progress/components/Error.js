import React from "react";
import logo from "../../../../assets/error.gif";
import { Link } from "react-router-dom";
import './approved.css'
export const Error = () => {
  return (
    <React.Fragment>
      <img className="check_image" src={logo} alt="check mark" />
      <div className="verified_text">
        some of your submitted documnets are wrong . check the re-upload section.
      </div>
      <Link to = '/re-upload' ><input className ="submit__payment"type="submit" id="submit" value="Re-upload" 
        ></input> </Link>
    </React.Fragment>
  );
};

export default Error;