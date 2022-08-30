import React from "react";
// import Form from "./components/Form";
import NavBar from "../../shared/components/Navigation/NavBar";
import Visaform from "./components/visa-from";
const VisaApplication = () => {
  // const [name, setName] = useState("");
  // const [selectedFile, setSelectedFile] = useState(null);


  return (
    <React.Fragment>
      <NavBar />
      <Visaform />
    </React.Fragment>
  );
};
export default VisaApplication;
