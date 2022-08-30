import React, { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import testPdf from "./Self_Test_Master_Data_Science_SoSe_2021.pdf";
import { saveAs } from "file-saver";
import "./pdf_view.css";
import { useDispatch } from "react-redux";
import { getAppByUserId, Check } from "../../../../actions/apps";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { authCotext } from "../../../shared/context/auth-context";
import { useHistory } from "react-router";

import { useSelector } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  FormControl,
  Input,
  FormLabel,
  InputLabel,
  Button,
} from "@material-ui/core";
// More examples here
import img from "../components/cat.png";
// https://github.com/wojtekmaj/react-pdf/wiki/Recipes

// You could also pass the file as a URL to the Document component as such:
// const url ="https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf";

const PdfView = () => {
  const history = useHistory();
  const [numPages, setNumPages] = useState({
    Reg: null,
    offer: null,
    matric: null,
    ver: null,
    exam: null,
    passport: 0,
  });
  const [pageNumber, setPageNumber] = useState({
    Reg: 1,
    offer: 1,
    matric: 1,
    ver: 1,
    exam: 1,
    passport: 1,
  });
  const [acceptb, setAccept] = useState({
    Reg: "back_transparent",
    offer: "back_transparent",
    matric: "back_transparent",
    ver: "back_transparent",
    exam: "back_transparent",
    passport: "back_transparent",
    photo: "back_transparent",
  });
  const [declineb, setDecline] = useState({
    Reg: "back_transparent",
    offer: "back_transparent",
    matric: "back_transparent",
    ver: "back_transparent",
    exam: "back_transparent",
    passport: "back_transparent",
    photo: "back_transparent",
  });
  const [check, setCheck] = useState({
    Reg: false,
    offer: false,
    matric: false,
    ver: false,
    exam: false,
    passport: false,
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
  const [show, setShow] = useState(false);
  console.log(userApp);
  useEffect(() => {}, [pageNumber, numPages, acceptb, declineb, check, show]);

  let path = "http://localhost:5000/";
  let pathR,
    pathOffer,
    pathPassport,
    pathPrevExam,
    pathmatric,
    pathVer,
    pathphoto;
  // let final_path;
  if (userApp.application !== undefined) {
    pathR = path + userApp.application.RegSlip.path.replace(/\\/g, "/");
    pathOffer = path + userApp.application.offerLetter.path.replace(/\\/g, "/");
    pathPassport = path + userApp.application.passport.path.replace(/\\/g, "/");
    pathPrevExam = path + userApp.application.ExamSlip.path.replace(/\\/g, "/");
    pathmatric = path + userApp.application.matric.path.replace(/\\/g, "/");
    pathVer = path + userApp.application.Verfication.path.replace(/\\/g, "/");
    pathphoto = path + userApp.application.photo.path.replace(/\\/g, "/");
  }

  // PDFjs aworker from an external cdn
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const payment = () => {
    userApp.application.new = false;
    userApp.application.payment = true;
    const bank = document.getElementById("bank").value;
    const ecommerce = document.getElementById("ecommerce").value;
    userApp.application.bankPayment.amount = bank;
    userApp.application.ecomPayment.amount = ecommerce;
    const formData = new FormData();
    // console.log( userApp.application.passport.accpet)
    // formData.append("photo", imagefile.files[0]);
    formData.append("passportAccept", userApp.application.passport.accept);
    formData.append(
      "offerLetterAccept",
      userApp.application.offerLetter.accept
    );
    formData.append("ExamSlipAccept", userApp.application.ExamSlip.accept);
    formData.append("matricAccept", userApp.application.matric.accept);
    formData.append(
      "VerficationAccept",
      userApp.application.Verfication.accept
    );
    formData.append("RegSlipAccept", userApp.application.RegSlip.accept);
    formData.append(
      "bankPaymentAccept",
      userApp.application.bankPayment.amount
    );
    formData.append(
      "ecomPaymentAccept",
      userApp.application.ecomPayment.amount
    );
    formData.append("photoAccept", userApp.application.photo.accept);
    formData.append("newApp", false);
    formData.append("payment", true);

    try {
      dispatch(Check(auth.token, userApp.application.id, formData));
    } catch (err) {
      console.log(err);
    }
    // window.location.reload(false);
    history.push("/clerk_dash");
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    check.Reg &&
    check.exam &&
    check.matric &&
    check.passport &&
    check.offer &&
    check.ver
      ? setShow(true)
      : reupload();
  };
  const reupload = () => {
    setShow(false);
    userApp.application.new = false;
    userApp.application.re_upload = true;

    const formData = new FormData();
    // console.log( userApp.application.passport.accpet)
    // formData.append("photo", imagefile.files[0]);
    formData.append("passportAccept", userApp.application.passport.accept);
    formData.append(
      "offerLetterAccept",
      userApp.application.offerLetter.accept
    );
    formData.append("ExamSlipAccept", userApp.application.ExamSlip.accept);
    formData.append("matricAccept", userApp.application.matric.accept);
    formData.append(
      "VerficationAccept",
      userApp.application.Verfication.accept
    );
    formData.append("RegSlipAccept", userApp.application.RegSlip.accept);
    formData.append(
      "bankPaymentAccept",
      userApp.application.bankPayment.amount
    );
    formData.append(
      "ecomPaymentAccept",
      userApp.application.ecomPayment.amount
    );
    formData.append("photoAccept", userApp.application.photo.accept);
    formData.append("newApp", false);
    formData.append("re_upload", true);

    try {
      dispatch(Check(auth.token, userApp.application.id, formData));
    } catch (err) {
      console.log(err);
    }
    // window.location.reload(false);
    history.push("/clerk_dash");
  };
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
        setPageNumber({ ...pageNumber,matric: p });
        break;
      case "offer":
        p = pageNumber.offer + 1;
        setPageNumber({ ...pageNumber,offer: p });
        break;
      case "ver":
        p = pageNumber.ver + 1;
        setPageNumber({ ...pageNumber, ver: p });
        break;
      case "exam":
        p = pageNumber.exam + 1;
        setPageNumber({ ...pageNumber,exam: p });
        break;
        default :
    }
  };
  const decrease = ({ type }) => {
    let p = 0;
    switch (type) {
      case "reg":
        p = pageNumber.Reg - 1;
        setPageNumber({ ...pageNumber,Reg: p });
        break;
      case "passport":
        p = pageNumber.passport - 1;
        console.log(p);

        setPageNumber({...pageNumber, passport: p });
        break;
      case "matric":
        p = pageNumber.matric - 1;
        setPageNumber({...pageNumber, matric: p });
        break;
      case "offer":
        p = pageNumber.offer - 1;
        setPageNumber({ ...pageNumber,offer: p });
        break;
      case "ver":
        p = pageNumber.ver - 1;
        setPageNumber({ ...pageNumber,ver: p });
        break;
      case "exam":
        p = pageNumber.exam - 1;
        setPageNumber({ ...pageNumber,exam: p });
        break;
    }
  };

  const saveFile = ({ filePath, name }) => {
    saveAs(filePath, `${name}.pdf`);
  };
  const accept = ({ type }) => {
    switch (type) {
      case "reg":
        setAccept({ ...acceptb, Reg: "decline_green" });
        setDecline({ ...decline, Reg: "back_transparent" });
        checkedApp.application.RegSlip.accept = true;
        setCheck({ ...check, Reg: true });
        break;
      case "passport":
        setAccept({ ...acceptb, passport: "decline_green" });
        setDecline({ ...decline, passport: "back_transparent" });
        checkedApp.application.passport.accept = true;
        setCheck({ ...check, passport: true });

        break;
      case "matric":
        setAccept({ ...acceptb, matric: "decline_green" });
        setDecline({ ...decline, matric: "back_transparent" });
        checkedApp.application.matric.accept = true;
        setCheck({ ...check, matric: true });

        break;
      case "offer":
        setAccept({ ...acceptb, offer: "decline_green" });
        setDecline({ ...decline, offer: "back_transparent" });
        checkedApp.application.offerLetter.accept = true;
        setCheck({ ...check, offer: true });

        break;
      case "ver":
        setAccept({ ...acceptb, ver: "decline_green" });
        setDecline({ ...decline, ver: "back_transparent" });
        checkedApp.application.Verfication.accept = true;
        setCheck({ ...check, ver: true });

        break;
      case "exam":
        setAccept({ ...acceptb, exam: "decline_green" });
        setDecline({ ...decline, exam: "back_transparent" });
        checkedApp.application.ExamSlip.accept = true;
        setCheck({ ...check, exam: true });
        break;
      case "photo":
        setAccept({ ...acceptb, photo: "decline_green" });
        setDecline({ ...decline, photo: "back_transparent" });
        checkedApp.application.photo.accept = true;
        setCheck({ ...check, photo: true });
        break;
    }
  };
  const decline = ({ type }) => {
    switch (type) {
      case "reg":
        setAccept({ ...acceptb, Reg: "back_transparent" });
        setDecline({ ...decline, Reg: "decline_red" });
        checkedApp.application.RegSlip.accept = false;
        setCheck({ ...check, Reg: false });

        break;
      case "passport":
        setAccept({ ...acceptb, passport: "back_transparent" });
        setDecline({ ...decline, passport: "decline_red" });
        checkedApp.application.passport.accept = false;
        setCheck({ ...check, passport: false });

        break;
      case "matric":
        setAccept({ ...acceptb, matric: "back_transparent" });
        setDecline({ ...decline, matric: "decline_red" });
        checkedApp.application.matric.accept = false;
        setCheck({ ...check, matric: false });

        break;
      case "offer":
        setAccept({ ...acceptb, offer: "back_transparent" });
        setDecline({ ...decline, offer: "decline_red" });
        checkedApp.application.offerLetter.accept = false;
        setCheck({ ...check, offer: false });

        break;
      case "ver":
        setAccept({ ...acceptb, ver: "back_transparent" });
        setDecline({ ...decline, ver: "decline_red" });
        checkedApp.application.Verfication.accept = false;
        setCheck({ ...check, ver: false });

        break;
      case "exam":
        setAccept({ ...acceptb, exam: "back_transparent" });
        setDecline({ ...decline, exam: "decline_red" });
        checkedApp.application.ExamSlip.accept = false;
        setCheck({ ...check, exam: false });

        break;
      case "photo":
        setAccept({ ...acceptb, photo: "back_transparent" });
        setDecline({ ...decline, photo: "decline_red" });
        checkedApp.application.photo.accept = false;
        setCheck({ ...check, photo: false });
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
        {console.log(check)}
        <form className="form__pdf" onSubmit={handleChange}>
          <h1>
            <FormLabel className="upload_label" component="legend">
              Visa Application
            </FormLabel>
          </h1>
          {/* Verification Letter */}
          <div>
            <InputLabel className="pdf_labels">Verification Letter</InputLabel>
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
                <Button
                  onClick={() =>
                    saveFile({ filePath: pathVer, name: "Verification" })
                  }
                  className="button_"
                >
                  Download
                </Button>
              </div>
              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.ver}
                  onClick={() => accept({ type: "ver" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.ver}
                  id="bt2"
                  onClick={() => decline({ type: "ver" })}
                >
                  Refuse
                </Button>
              </FormControl>
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
                <Button
                  onClick={() =>
                    saveFile({ filePath: pathPassport, name: "passport" })
                  }
                  className="button_"
                >
                  Download
                </Button>
              </div>
              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.passport}
                  onClick={() => accept({ type: "passport" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.passport}
                  id="bt2"
                  onClick={() => decline({ type: "passport" })}
                >
                  Refuse
                </Button>
              </FormControl>
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
                <Button
                  onClick={() =>
                    saveFile({ filePath: pathmatric, name: "matric" })
                  }
                  className="button_"
                >
                  Download
                </Button>
              </div>
              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.matric}
                  onClick={() => accept({ type: "matric" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.matric}
                  id="bt2"
                  onClick={() => decline({ type: "matric" })}
                >
                  Refuse
                </Button>
              </FormControl>
            </div>
          </div>
          {/* Matric */}
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
                <Button
                  onClick={() =>
                    saveFile({ filePath: pathPrevExam, name: "exam" })
                  }
                  className="button_"
                >
                  Download
                </Button>
              </div>
              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.exam}
                  onClick={() => accept({ type: "exam" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.exam}
                  id="bt2"
                  onClick={() => decline({ type: "exam" })}
                >
                  Refuse
                </Button>
              </FormControl>
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
                <Button
                  onClick={() =>
                    saveFile({ filePath: pathOffer, name: "offer" })
                  }
                  className="button_"
                >
                  Download
                </Button>
              </div>
              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.offer}
                  onClick={() => accept({ type: "offer" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.offer}
                  id="bt2"
                  onClick={() => decline({ type: "offer" })}
                >
                  Refuse
                </Button>
              </FormControl>
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
                <Button
                  onClick={() => saveFile({ filePath: pathR, name: "reg" })}
                  className="button_"
                >
                  Download
                </Button>
              </div>
              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.Reg}
                  onClick={() => accept({ type: "reg" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.Reg}
                  id="bt2"
                  onClick={() => decline({ type: "reg" })}
                >
                  Refuse
                </Button>
              </FormControl>
            </div>
          </div>

          {/* image */}
          <div>
            <InputLabel className="pdf_labels">Passport photo </InputLabel>

            <div className="pdf__reader">
              <img className="img_pdf" src={pathphoto} />

              <FormControl className="row-radio-buttons">
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Decision
                </FormLabel>

                <Button
                  id="bt1"
                  className={acceptb.photo}
                  onClick={() => accept({ type: "photo" })}
                >
                  Allow
                </Button>
                <Button
                  className={declineb.photo}
                  id="bt2"
                  onClick={() => decline({ type: "photo" })}
                >
                  Refuse
                </Button>
              </FormControl>
            </div>
          </div>
          <Button variant="primary" className="submit" onClick={handleShow}>
          Submit
          </Button>
          <Modal show={show} onHide={handleClose}>
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
          </Modal>
        </form>
      </>
    );
};

export default PdfView;
