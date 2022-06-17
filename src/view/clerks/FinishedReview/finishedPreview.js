import React from "react";
import PdfView from "./components/pdf_view";
import Navbar from "../Dashboard/components/Navbar/Navbar";
import I_kadPdfView from "./components/i_kad_pdf";

import { useParams } from "react-router-dom";

const FinishedPreview = () => {
const {type} = useParams()

  return (
    <>
     <Navbar />

    {(type === "visa" )?
      <PdfView /> : <I_kadPdfView/>}
    </>
  )
};

export default FinishedPreview;
