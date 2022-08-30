import React from "react";
import logo from "../../../../assets/checkmark.gif";
import './approved.css'
export const Approved = () => {
  return (
    <React.Fragment>
      <img className="check_image" src={logo} alt="check mark" />
      <div className="verified_text">
        you completly finished you application. you can keep track with EMGS
        Appliaction
      </div>
    </React.Fragment>
  );
};

export default Approved;