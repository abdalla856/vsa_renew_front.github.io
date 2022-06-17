import React from "react";
import NavBar from "../../shared/components/Navigation/NavBar";
import Ruploadform from "./components/components/reupload_form";
import { useSelector } from "react-redux";
const Reupload = () => {
  
    // const apps = useSelector(
    //   (state)=>state.app
    // )
    // console.log(apps)
 
 return <React.Fragment>
      <NavBar/>
      <Ruploadform  />

  </React.Fragment>;
};
export default Reupload;
