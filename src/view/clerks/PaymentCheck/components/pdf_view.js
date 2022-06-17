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

import { FormControl, FormLabel, InputLabel, Button } from "@material-ui/core";
// More examples here

// You could also pass the file as a URL to the Document component as such:
const url =
  "https://s3-ap-southeast-1.amazonaws.com/happay-local/HVP/BILL20198261213473719445688HP.pdf";

const Paymentpdfview = () => {
  const history = useHistory();
  const [numPages, setNumPages] = useState({
    BankPayment: null,
    Ecommerce: null,
  });
  const [pageNumber, setPageNumber] = useState({
    BankPayment: 1,
    Ecommerce: 1,
  });
  const [acceptb, setAccept] = useState({
    BankPayment: "back_transparent",
    Ecommerce: "back_transparent",
  });
  const [declineb, setDecline] = useState({
    BankPayment: "back_transparent",
    Ecommerce: "back_transparent",
  });
  const [check, setCheck] = useState({
    BankPayment: false,
    Ecommerce: false,
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
  let pathBank, pathEcommerce, pathPassport, pathPrevExam, pathmatric, pathVer;
  // let final_path;
  if (userApp.application !== undefined) {
    pathBank = path + userApp.application.bankPayment.path.replace(/\\/g, "/");
    pathEcommerce =
      path + userApp.application.ecomPayment.path.replace(/\\/g, "/");
  }

  // PDFjs aworker from an external cdn
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  // const payment = () => {
  //   userApp.application.new = false;
  //   userApp.application.payment = true;
  //   const bank = document.getElementById("bank").value;
  //   const ecommerce = document.getElementById("ecommerce").value;
  //   userApp.application.bankPayment.accept = bank;
  //   userApp.application.ecomPayment.accept = ecommerce;
  //   const formData = new FormData();
  //   // console.log( userApp.application.passport.accpet)
  //   // formData.append("photo", imagefile.files[0]);
  //   formData.append("passportAccept", userApp.application.passport.accept);
  //   formData.append(
  //     "EcommerceLetterAccept",
  //     userApp.application.EcommerceLetter.accept
  //   );
  //   formData.append("ExamSlipAccept", userApp.application.ExamSlip.accept);
  //   formData.append("matricAccept", userApp.application.matric.accept);
  //   formData.append(
  //     "VerficationAccept",
  //     userApp.application.Verfication.accept
  //   );
  //   formData.append("BankPaymentSlipAccept", userApp.application.BankPaymentSlip.accept);
  //   formData.append(
  //     "bankPaymentAccept",
  //     userApp.application.bankPayment.amount
  //   );
  //   formData.append(
  //     "ecomPaymentAccept",
  //     userApp.application.ecomPayment.amount
  //   );
  //   formData.append("newApp", false);
  //   formData.append("payment", true);

  //   try {
  //     dispatch(Check(auth.token, userApp.application.id, formData));
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // window.location.reload(false);
  //   // history.push("/clerk_dash");
  // };

  // const handleClose = () => setShow(false);
  const handleShow = () => {
    if (check.BankPayment && check.Ecommerce) {
      userApp.application.payment = false;
      userApp.application.finished = true;
    } else {
      userApp.application.payment = false;
      userApp.application.re_upload = true;
      // userApp.application.re_upload_uploads = false;
    }

    const formData = new FormData();
    formData.append("EcommerceAccept", userApp.application.ecomPayment.accept);

    formData.append("bankAccept", userApp.application.bankPayment.accept);

    formData.append("payment", userApp.application.payment);
    formData.append("re_upload", userApp.application.re_upload);
    formData.append("re_upload_uploads", true);
    formData.append("finished", userApp.application.finished);

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
    }
  };
  const increase = ({ type }) => {
    let p = 0;
    switch (type) {
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
      case "BankPayment":
        setAccept({ ...acceptb, BankPayment: "decline_green" });
        setDecline({ ...decline, BankPayment: "back_transparent" });
        checkedApp.application.bankPayment.accept = true;
        setCheck({ ...check, BankPayment: true });
        break;

      case "Ecommerce":
        setAccept({ ...acceptb, Ecommerce: "decline_green" });
        setDecline({ ...decline, Ecommerce: "back_transparent" });
        checkedApp.application.ecomPayment.accept = true;
        setCheck({ ...check, Ecommerce: true });

        break;
    }
  };
  const decline = ({ type }) => {
    switch (type) {
      case "BankPayment":
        setAccept({ ...acceptb, BankPayment: "back_transparent" });
        setDecline({ ...decline, BankPayment: "decline_red" });
        checkedApp.application.bankPayment.accept = false;
        setCheck({ ...check, BankPayment: false });

        break;

      case "Ecommerce":
        setAccept({ ...acceptb, Ecommerce: "back_transparent" });
        setDecline({ ...decline, Ecommerce: "decline_red" });
        checkedApp.application.ecomPayment.accept = false;
        setCheck({ ...check, Ecommerce: false });

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
          {/* BankPaymentisteration */}
          <div>
            <InputLabel className="pdf_labels">BankPayment Document</InputLabel>
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

          <Button variant="primary" onClick={handleShow} className="submit">
            Submit
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

export default Paymentpdfview;
