import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import testPdf from "./Self_Test_Master_Data_Science_SoSe_2021.pdf";

import "./pdf_view.css";
import { useDispatch } from "react-redux";
import { getAppByUserId } from "../../../../actions/apps";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { authCotext } from "../../../shared/context/auth-context";
import { useHistory } from "react-router";

import { useSelector } from "react-redux";

import {

  FormLabel,
  InputLabel,
  Button,
} from "@material-ui/core";
// More examples here
import img from "../components/cat.png";
// https://github.com/wojtekmaj/react-pdf/wiki/Recipes

// You could also pass the file as a URL to the Document component as such:
const url =
  "https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf";

const PdfView = () => {
  const history = useHistory();
  const [numPages, setNumPages] = useState({
    Reg: null,
    offer: null,
    matric: null,
    ver: null,
    exam: null,
    passport: 0,
    BankPayment: null,
    Ecommerce: null,
  });
  const [pageNumber, setPageNumber] = useState({
    Reg: 1,
    offer: 1,
    matric: 1,
    ver: 1,
    exam: 1,
    passport: 1,
    BankPayment: 1,
    Ecommerce: 1,
  });


  const { id } = useParams();
  const dispatch = useDispatch();

  const auth = useContext(authCotext);

  useEffect(() => {
    dispatch(getAppByUserId(auth.token, id));
    console.log(numPages);
  }, [dispatch]);
  const userApp = useSelector((state) => state.apps);
  const checkedApp = userApp;
  // const [show, setShow] = useState(false);
  console.log(userApp);
  useEffect(() => {}, [pageNumber, numPages]);

  let path = "http://localhost:5000/";
  let pathR,
    pathOffer,
    pathPassport,
    pathPrevExam,
    pathmatric,
    pathVer,
    pathphoto,
    pathBank,
    pathEcommerce;

  if (userApp.application !== undefined) {
    pathR = path + userApp.application.RegSlip.path.replace(/\\/g, "/");
    pathOffer = path + userApp.application.offerLetter.path.replace(/\\/g, "/");
    pathPassport = path + userApp.application.passport.path.replace(/\\/g, "/");
    pathPrevExam = path + userApp.application.ExamSlip.path.replace(/\\/g, "/");
    pathmatric = path + userApp.application.matric.path.replace(/\\/g, "/");
    pathVer = path + userApp.application.Verfication.path.replace(/\\/g, "/");
    pathphoto = path + userApp.application.photo.path.replace(/\\/g, "/");
    pathBank = path + userApp.application.bankPayment.path.replace(/\\/g, "/");
    pathEcommerce =
      path + userApp.application.ecomPayment.path.replace(/\\/g, "/");

  }


  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  const handleShow = () => {

    history.push("/clerk_dash");

  };
  // const reupload = () => {
  //   setShow(false);

  //   const formData = new FormData();
  //   // console.log( userApp.application.passport.accpet)
  //   // formData.append("photo", imagefile.files[0]);
  //   formData.append("passportAccept", check.passport);
  //   formData.append("offerLetterAccept", check.offer);
  //   formData.append("ExamSlipAccept", check.exam);
  //   formData.append("matricAccept", check.matric);
  //   formData.append("VerficationAccept", check.ver);
  //   formData.append("RegSlipAccept", check.Reg);
  //   formData.append("bankaccept", check.BankPayment);
  //   formData.append("RegSlipAccept", check.Reg);
  //   formData.append("photoAccept", check.photo);
  //   formData.append("newApp", false);
  //   formData.append("re_upload", true);

  //   try {
  //     dispatch(Check(auth.token, userApp.application.id, formData));
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // window.location.reload(false);
  //   // history.push("/clerk_dash");
  // };
  const onDocumentLoadSuccess = ({ numPage, type }) => {
    const num = numPage;
    let newObj;

    switch (type) {
      case "reg":
        // if (!(numPages.Reg < pageNumber.Reg)) break;
        newObj = { Reg: num };

        setNumPages((numPages) => ({
          ...numPages,
          ...newObj,
        }));

        setPageNumber({ ...pageNumber, Reg: 1 });

        break;

      case "passport":
        newObj = { passport: num };
        setNumPages((numPages) => ({
          ...numPages,
          ...newObj,
        }));
        setPageNumber({ ...pageNumber, passport: 1 });
        break;

      case "matric":
        setNumPages({ ...numPages, matric: numPage });
        setPageNumber({ ...pageNumber, matric: 1 });
        break;
      case "offer":
        setNumPages({ ...numPages, offer: numPage });
        setPageNumber({ ...pageNumber, offer: 1 });
        break;
      case "ver":
        newObj = { ver: num };

        setNumPages((numPages) => ({
          ...numPages,
          ...newObj,
        }));
        setPageNumber({ ...pageNumber, ver: 1 });
        break;
      case "exam":
        setNumPages({ ...numPages, exam: numPage });
        setPageNumber({ ...pageNumber, exam: 1 });
        break;

      case "BankPayment":
        // if (!(numPages.BankPayment < pageNumber.BankPayment)) break;
        newObj = { BankPayment: num };

        setNumPages((numPages) => ({
          ...numPages,
          ...newObj,
        }));

        setPageNumber({ ...pageNumber, BankPayment: 1 });
        console.log(pageNumber.BankPayment);
        break;

      case "Ecommerce":
        setNumPages({ ...numPages, Ecommerce: num });
        setPageNumber({ ...pageNumber, Ecommerce: 1 });
        break;
      default:
    }
  };
  const increase = ({ type }) => {
    let p = 0;
    switch (type) {
      case "reg":
        p = pageNumber.Reg + 1;
        setPageNumber({ ...pageNumber, Reg: p });
        break;
      case "passport":
        p = pageNumber.passport + 1;
        console.log(p);
        setPageNumber({ ...pageNumber, passport: p });
        break;
      case "matric":
        p = pageNumber.matric + 1;
        setPageNumber({ ...pageNumber, matric: p });
        break;
      case "offer":
        p = pageNumber.offer + 1;
        setPageNumber({ ...pageNumber, offer: p });
        break;
      case "ver":
        p = pageNumber.ver + 1;
        setPageNumber({ ...pageNumber, ver: p });
        break;
      case "exam":
        p = pageNumber.exam + 1;
        setPageNumber({ ...pageNumber, exam: p });
        break;
      case "BankPayment":
        p = pageNumber.BankPayment + 1;
        setPageNumber({ ...pageNumber, BankPayment: p });
        break;

      case "Ecommerce":
        p = pageNumber.Ecommerce + 1;
        setPageNumber({ ...pageNumber, Ecommerce: p });
        break;
    }
  };
  const decrease = ({ type }) => {
    let p = 0;
    switch (type) {
      case "reg":
        p = pageNumber.Reg - 1;
        setPageNumber({ ...pageNumber, Reg: p });
        break;
      case "passport":
        p = pageNumber.passport - 1;
        console.log(p);

        setPageNumber({ ...pageNumber, passport: p });
        break;
      case "matric":
        p = pageNumber.matric - 1;
        setPageNumber({ ...pageNumber, matric: p });
        break;
      case "offer":
        p = pageNumber.offer - 1;
        setPageNumber({ ...pageNumber, offer: p });
        break;
      case "ver":
        p = pageNumber.ver - 1;
        setPageNumber({ ...pageNumber, ver: p });
        break;
      case "exam":
        p = pageNumber.exam - 1;
        setPageNumber({ ...pageNumber, exam: p });
        break;
      case "BankPayment":
        p = pageNumber.BankPayment - 1;
        setPageNumber({ ...pageNumber, BankPayment: p });
        break;

      case "Ecommerce":
        p = pageNumber.Ecommerce - 1;
        setPageNumber({ ...pageNumber, Ecommerce: p });
        break;
    }
  };


  const handleChange = (event) => {
    // event.preventDefault();
  };
  if (userApp !== undefined)
    return (
      <>
        {console.log(checkedApp)}
      
        <form className="form__pdf" onSubmit={handleChange}>
          <h1>
            <FormLabel className="upload_label" component="legend">
              Visa Application
            </FormLabel>
          </h1>
          {/* Verification Letter */}
      
            <div>
              <InputLabel className="pdf_labels">
                Verification Letter
              </InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathVer}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "ver",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.ver} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.ver} of {numPages.ver}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "ver" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "ver" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
           
                </div>
              
              </div>
            </div>
         

          {/* Passport Pages */}
      
            <div>
              <InputLabel className="pdf_labels">Passport Pages</InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathPassport}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "passport",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.passport} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.passport} of {numPages.passport}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "passport" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "passport" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
               
                </div>
            
              </div>
            </div>
  

          {/* Matric */}
       
            <div>
              <InputLabel className="pdf_labels">Student Matric</InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathmatric}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "matric",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.matric} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.matric} of {numPages.matric}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "matric" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "matric" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
         
                </div>
               
              </div>
            </div>
     
          {/* Exam */}
         
            <div>
              <InputLabel className="pdf_labels">Previous ExamSlip</InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathPrevExam}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "exam",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.exam} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.exam} of {numPages.exam}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "exam" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "exam" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
                 
                </div>
             
              </div>
            </div>
   

          {/* Offer */}
         
            <div>
              <InputLabel className="pdf_labels">Offer Letter</InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathOffer}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "offer",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.offer} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.offer} of {numPages.offer}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "offer" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "offer" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
            
                </div>
            
              </div>
            </div>
      
          {/* Registeration */}
        
            <div>
              <InputLabel className="pdf_labels">Registration Slip</InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathR}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "reg",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.Reg} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.Reg} of {numPages.Reg}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "reg" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "reg" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
          
                </div>
               
              </div>
            </div>
     
          {/* image */}
         
            <div>
              <InputLabel className="pdf_labels">Passport Photo </InputLabel>

              <div className="pdf__reader">
                <img className="img_pdf" src={pathphoto} />

         
              </div>
            </div>
  

          {/* Ecommerce */}
      
            <div>
              <InputLabel className="pdf_labels">Ecommerce Document</InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathEcommerce}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "Ecommerce",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.Ecommerce} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.Ecommerce} of {numPages.Ecommerce}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "Ecommerce" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "Ecommerce" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
           
                </div>
             
              </div>
            </div>
       
          {/* BankPaymentisteration */}
      
            <div>
              <InputLabel className="pdf_labels">
                BankPayment Document
              </InputLabel>
              <br />
              <br />
              <div className="pdf__reader">
                <div>
                  <Document
                    file={pathBank}
                    onLoadSuccess={(info) =>
                      onDocumentLoadSuccess({
                        numPage: info._pdfInfo.numPages,
                        type: "BankPayment",
                      })
                    }
                  >
                    <Page pageNumber={pageNumber.BankPayment} />
                  </Document>
                  <p className="page_text">
                    Page {pageNumber.BankPayment} of {numPages.BankPayment}
                  </p>
                </div>
                <div className="button_pdf">
                  <Button
                    onClick={() => decrease({ type: "BankPayment" })}
                    className="button_"
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => increase({ type: "BankPayment" })}
                    className="button_"
                    variant="text"
                  >
                    Next
                  </Button>
                
                </div>
             
              </div>
            </div>
      
          <Button variant="primary" onClick={handleShow} className= "submit">
            Home 
          </Button>
          {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Payment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <InputLabel>Bank payment</InputLabel>
              <Input type="number" id="bank" required />
              <InputLabel>Ecommerce payment</InputLabel>
              <Input type="number" id="ecommerce" required />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={payment}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal> */}
        </form>
      </>
    );
};

export default PdfView;
