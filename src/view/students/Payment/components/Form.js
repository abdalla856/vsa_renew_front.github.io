import React, { useEffect } from "react";

import { FormLabel, InputLabel, TextField, Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { getAppByUserId } from "../../../../actions/apps";

import { useDispatch } from "react-redux";
import { uploadPayment } from "../../../../actions/apps";

import { useHistory } from "react-router";

import "./Form.css";
const Form = (params) => {
  const dispatch = useDispatch();
  const history = useHistory();
  // const auth = useContext(authCotext);

  let tokenUser = -false;
  let Userid = "";
  if (JSON.parse(localStorage.getItem("userData"))) {
    const { token, userId } = JSON.parse(localStorage.getItem("userData"));
    tokenUser = token;
    Userid = userId;
  }

  console.log(tokenUser);

  const data = useSelector((state) => state.apps);
  const app = data.application;
  let bankAmount,
    ecomAmount = 0;

  if (app !== undefined) {
    ecomAmount = app.ecomPayment.amount;
    bankAmount = app.bankPayment.amount;
  }

  useEffect(() => {
    dispatch(getAppByUserId(tokenUser, Userid));
  }, [dispatch]);

  const handlePayment = (e) => {
    e.preventDefault();
    var formData = new FormData();
console.log("hi")
    var e_commerce = document.querySelector("#e-commerce");
    var bank = document.querySelector("#bank");
console.log(bank)
console.log(e_commerce)
    try {
      if(e_commerce!==undefined){ formData.append("ecomPayment", e_commerce.files[0]);}
      if(bank!==undefined) {formData.append("bankPayment", bank.files[0]);}
      formData.append("payment_upload", true);
      formData.append("payment", false);
      formData.append("re_upload", false);
      dispatch(uploadPayment(tokenUser, app.id, formData));
      history.push("/user");
    } catch (err) {
      alert(err.message);
    }
    alert("Created Succesfully");
  };
  if (data !== undefined) {
    return (
      <form className="form__to__apply" onSubmit={handlePayment}>
        <h1>
          <FormLabel className="upload_label" component="legend">
            {params.name}
          </FormLabel>
        </h1>
        <div className="container_visa">
          <div className="inputs">
            {/* Ecom */}
            <div>
              <InputLabel htmlFor={"e-commerce"}>
                Pay {ecomAmount}rm by using e-commerce
              </InputLabel>

              <TextField
                required
                name="e-commerce"
                inputProps={{ accept: "application/pdf" }}
                id="e-commerce"
                type="file"
                requried
              />
              <h6 className="note_text">*please upload file in PDF format</h6>
            </div>
            {/* Bank */}
            <div>
              <InputLabel htmlFor="bank">
                Pay {bankAmount}rm using this bank number XXXXXXXX .Maybank
              </InputLabel>
              <TextField
                name="bank"
                inputProps={{
                  accept: "application/pdf",
                }}
                id="bank"
                type="file"
                required
              />
              <h6 className="note_text">*please upload file in PDF format</h6>
            </div>
          </div>
        </div>
        <div className="button">
          <Button type="submit" variant="contained" color="primary">
            Apply
          </Button>
        </div>
      </form>
    );
  }
};

export default Form;
