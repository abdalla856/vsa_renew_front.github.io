import React from "react";
import logo from "../../../../assets/progress.gif";
import './approved.css'
export const INProgress = () => {
  return (
    <React.Fragment>
      <img className="check_image" src={logo} alt="check mark" />
      <div className="verified_text">
    Your application in progress with UTM ISC 
      </div>
    </React.Fragment>
  );
};

export default INProgress;