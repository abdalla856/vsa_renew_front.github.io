import React from "react";
import logo from "../../../../assets/downsign.gif";
import { Link } from "react-router-dom";
import './approved.css'
export const Exclamat = () => {
  return (
    <React.Fragment>
      <img className="check_image" src={logo} alt="check mark" />
      <div className="verified_text">
        Your application approved but you need to finish your payment
      </div>
      <Link to = '/payment' ><input className ="submit__payment"type="submit" id="submit" value="Payment" 
        ></input> </Link>
    </React.Fragment>
  );
};

export default Exclamat;