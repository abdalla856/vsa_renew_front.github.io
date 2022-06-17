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

// import pdf from "../.../.../../../../../../../../VIsa_Renewal_Back/uploads/files/00b8d353-64d9-4216-b34d-7d8c260f2d1e.pdf";
//
// import { authCotext } from "../../shared/context/auth-context";
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

// You could also pass the file as a URL to the Document component as such:


const I_kadPdfView = () => {
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
  const [acceptb, setAccept] = useState({
    Reg: "back_transparent",
    offer: "back_transparent",
    matric: "back_transparent",
    ver: "back_transparent",
    exam: "back_transparent",
    passport: "back_transparent",
    BankPayment: "back_transparent",
    Ecommerce: "back_transparent",
  });
  const [declineb, setDecline] = useState({
    Reg: "back_transparent",
    offer: "back_transparent",
    matric: "back_transparent",
    ver: "back_transparent",
    exam: "back_transparent",
    passport: "back_transparent",
    BankPayment: "back_transparent",
    Ecommerce: "back_transparent",
  });
  const [check, setCheck] = useState({
    Reg: true,
    offer: true,
    matric: true,
    ver: true,
    exam: true,
    passport: true,
    BankPayment: true,
    Ecommerce: true,
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
  useEffect(() => {}, [pageNumber, numPages,
    //  acceptb,
      // declineb, 
      check, show]);

  let path = "http://localhost:5000/";
  let pathR, pathOffer, pathPassport, pathPrevExam, pathmatric, pathVer,pathBank, pathEcommerce;
  let PassportAcc,
    Raccept,
    ExamAcc,
    matriocAcc,
    bankAccept,
    emcomAccept = true;
  

  // let final_path;



  if (userApp.application !== undefined) {
    pathBank = path + userApp.application.bankPayment.path.replace(/\\/g, "/");
    pathEcommerce =
    path + userApp.application.ecomPayment.path.replace(/\\/g, "/");
    pathR = path + userApp.application.RegSlip.path.replace(/\\/g, "/");
    pathPassport = path + userApp.application.passport.path.replace(/\\/g, "/");
    pathPrevExam = path + userApp.application.ExamSlip.path.replace(/\\/g, "/");
    pathmatric = path + userApp.application.matric.path.replace(/\\/g, "/");
    PassportAcc = userApp.application.passport.accept;
    Raccept = userApp.application.RegSlip.accept;
    ExamAcc = userApp.application.ExamSlip.accept;
    matriocAcc = userApp.application.matric.accept;
    bankAccept = userApp.application.bankPayment.accept ;
    emcomAccept = userApp.application.ecomPayment.accept;

  }
 ;

console.log(PassportAcc)


  // PDFjs aworker from an external cdn
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const payment = () => {
    const formData = new FormData();
    userApp.application.new = false;
    userApp.application.payment = true;
    if (check.BankPayment &&check.Ecommerce&&!userApp.application.payment_upload) {
      const bank = document.getElementById("bank").value;
      const ecommerce = document.getElementById("ecommerce").value;
      userApp.application.bankPayment.amount = bank;
      userApp.application.ecomPayment.amount = ecommerce;
      formData.append(
        "bankPaymentAccept",
        bank
      );
      formData.append(
        "ecomPaymentAccept",
        ecommerce
      );
    }
    // console.log( userApp.application.passport.accpet)
    // formData.append("photo", imagefile.files[0]);
    formData.append("passportAccept", check.passport);

    formData.append("ExamSlipAccept", check.exam);
    formData.append("matricAccept", check.matric);

    formData.append("RegSlipAccept", check.Reg);

    formData.append("newApp", false);
    formData.append("re_upload", false);
    if(check.BankPayment && check.Ecommerce &&userApp.application.payment_upload)
   { formData.append("finished", true)
   formData.append("payment", false)}else
     {formData.append("payment", true);
     formData.append("finished", false)}


    try {
      dispatch(Check(auth.token, userApp.application.id, formData));
    } catch (err) {
      console.log(err);
    }
    // window.location.reload(false);
    history.push("/clerk_dash");
  };

  const handleClose = () => setShow(false);
  const reupload = () => {
    setShow(false);
   

    const formData = new FormData();

    formData.append("passportAccept", check.passport);

    formData.append("ExamSlipAccept", check.exam);
    formData.append("matricAccept", check.matric);
    formData.append("EcommerceAccept", check.Ecommerce);

    formData.append("bankaccept", check.BankPayment);
    formData.append("RegSlipAccept", check.Reg);

    formData.append("newApp", false);
    formData.append("re_upload", true);

    formData.append("re_upload_uploads", false);

    try {
      dispatch(Check(auth.token, userApp.application.id, formData));
    } catch (err) {
      console.log(err);
    }
    history.push("/clerk_dash");
  };

  const handleShow = () => {
 
    if (
      check.Reg &&
      check.exam &&
      check.matric &&
      check.passport &&
      check.BankPayment &&
      check.Ecommerce &&
      !userApp.application.payment_upload
    ) {
      setShow(true);
    }else if(
      check.Reg &&
      check.exam &&
      check.matric &&
      check.passport &&
      check.BankPayment &&
      check.Ecommerce &&
      userApp.application.payment_upload
    ){payment()} 
    else {
      reupload();
    }
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
        setPageNumber({ ...pageNumber,matric: p });
        break;

      case "exam":
        p = pageNumber.exam + 1;
        setPageNumber({ ...pageNumber,exam: p });
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
        setPageNumber({ ...pageNumber,Reg: p });
        break;
      case "passport":
        p = pageNumber.passport - 1;
        console.log(p);

        setPageNumber({ ...pageNumber,passport: p });
        break;
      case "matric":
        p = pageNumber.matric - 1;
        setPageNumber({ ...pageNumber,matric: p });
        break;

      case "exam":
        p = pageNumber.exam - 1;
        setPageNumber({ ...pageNumber,exam: p });
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

  const saveFile = ({ filePath, name }) => {
    saveAs(filePath, `${name}.pdf`);
  };
  const accept = ({ type }) => {
    switch (type) {
      case "reg":
        setAccept({ ...acceptb, Reg: "decline_green" });
        setDecline({ ...decline, Reg: "back_transparent" });
        // checkedApp.application.RegSlip.accept = true;
        setCheck({ ...check, Reg: true });
        break;
      case "passport":
        setAccept({ ...acceptb, passport: "decline_green" });
        setDecline({ ...decline, passport: "back_transparent" });
        // checkedApp.application.passport.accept = true;
        setCheck({ ...check, passport: true });

        break;
      case "matric":
        setAccept({ ...acceptb, matric: "decline_green" });
        setDecline({ ...decline, matric: "back_transparent" });
        // checkedApp.application.matric.accept = true;
        setCheck({ ...check, matric: true });

        break;

      case "exam":
        setAccept({ ...acceptb, exam: "decline_green" });
        setDecline({ ...decline, exam: "back_transparent" });
        // checkedApp.application.ExamSlip.accept = true;
        setCheck({ ...check, exam: true });
        break;
      case "BankPayment":
        setAccept({ ...acceptb, BankPayment: "decline_green" });
        setDecline({ ...decline, BankPayment: "back_transparent" });
        // checkedApp.application.bankPayment.accept = true;
        setCheck({ ...check, BankPayment: true });
        break;

      case "Ecommerce":
        setAccept({ ...acceptb, Ecommerce: "decline_green" });
        setDecline({ ...decline, Ecommerce: "back_transparent" });
        // checkedApp.application.ecomPayment.accept = true;
        setCheck({ ...check, Ecommerce: true });

        break;
    }
  };
  const decline = ({ type }) => {
    switch (type) {
      case "reg":
        setAccept({ ...acceptb, Reg: "back_transparent" });
        setDecline({ ...declineb, Reg: "decline_red" });
        checkedApp.application.RegSlip.accept = false;
        setCheck({ ...check, Reg: false });

        break;
      case "passport":
        setAccept({ ...acceptb, passport: "back_transparent" });
        setDecline({ ...declineb, passport: "decline_red" });
        checkedApp.application.passport.accept = false;
        setCheck({ ...check, passport: false });

        break;
      case "matric":
        setAccept({ ...acceptb, matric: "back_transparent" });
        setDecline({ ...declineb, matric: "decline_red" });
        checkedApp.application.matric.accept = false;
        setCheck({ ...check, matric: false });

        break;

    

      case "exam":
        setAccept({ ...acceptb, exam: "back_transparent" });
        setDecline({ ...declineb, exam: "decline_red" });
        checkedApp.application.ExamSlip.accept = false;
        setCheck({ ...check, exam: false });

        break;
      case "BankPayment":
        setAccept({ ...acceptb, BankPayment: "back_transparent" });
        setDecline({ ...declineb, BankPayment: "decline_red" });
        checkedApp.application.bankPayment.accept = false;
        setCheck({ ...check, BankPayment: false });

        break;

      case "Ecommerce":
        setAccept({ ...acceptb, Ecommerce: "back_transparent" });
        setDecline({ ...declineb, Ecommerce: "decline_red" });
        checkedApp.application.ecomPayment.accept = false;
        setCheck({ ...check, Ecommerce: false });

        break;
    }
  };
  const handleChange = (event) => {
    event.preventDefault();
  };
  if (userApp !== undefined)
    return (
      <>
        <form className="form__pdf" onSubmit={handleChange}>
          <h1>
            <FormLabel className="upload_label" component="legend">
              I-kad Application
            </FormLabel>
          </h1>

          {/* Passport Pages */}
          {!PassportAcc && (
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
          )}

          {/* Matric */}
          {!matriocAcc && (
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
          )}
          {/* Exam slip */}
          {!ExamAcc && (
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
          )}

          {/* Registeration */}
          {!Raccept && (
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
          )}

          {/* Ecommerce */}
          {(!emcomAccept) && (
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
                  <Button
                    onClick={() =>
                      saveFile({ filePath: pathEcommerce, name: "Ecommerce" })
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
                    className={acceptb.Ecommerce}
                    onClick={() => accept({ type: "Ecommerce" })}
                  >
                    Allow
                  </Button>
                  <Button
                    className={declineb.Ecommerce}
                    id="bt2"
                    onClick={() => decline({ type: "Ecommerce" })}
                  >
                    Refuse
                  </Button>
                </FormControl>
              </div>
            </div>
          )}
          {/* BankPaymentisteration */}
          {(! bankAccept) && (
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
                  <Button
                    onClick={() =>
                      saveFile({ filePath: pathBank, name: "BankPayment" })
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
                    className={acceptb.BankPayment}
                    onClick={() => accept({ type: "BankPayment" })}
                  >
                    Allow
                  </Button>
                  <Button
                    className={declineb.BankPayment}
                    id="bt2"
                    onClick={() => decline({ type: "BankPayment" })}
                  >
                    Refuse
                  </Button>
                </FormControl>
              </div>
            </div>
          )}

          <Button variant="primary" onClick={handleShow} className="submit">
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

export default I_kadPdfView;
