import React, { useState } from "react";
import { useForm } from "react-cool-form";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  TextField,
  Select,
  Checkbox,
  Button,
  Input,
} from "@material-ui/core";
import "./Form.css";
import { useDispatch } from "react-redux";
import { createVisa } from "../../../../actions/apps";

const Form = (params) => {
  const [appData, setAppData] = useState({
    creator:'61fd41ef7580c51ae85e2697'
  });
  const dispatch = useDispatch();

  const handlePost = e => {
    e.preventDefault();
    dispatch(createVisa(appData));
  };
  // const { form, use } = useForm({
  //   defaultValues: { username: "", framework: "", fruit: [] },
  //   onSubmit: handlePost
  // });
  // const errors = use("errors");
const handler = (file)=>{
  console.log(file)
}
  return (
    <form className="form__to__apply" onSubmit={handlePost} noValidate>
      <h1>
        <FormLabel className="upload_label" component="legend">
          {params.name}
        </FormLabel>
      </h1>
      <div className="container_visa">
        <div className="inputs">
          {params.inputs.map((e, index) => {
            if (index < 4)
              return (
                <React.Fragment>
                  <InputLabel htmlFor={e.htmlFor}>{e.label}</InputLabel>
                  <TextField name={e.name} type="file" />
                </React.Fragment>
              );
          })}
        </div>
        <div className="inputs_2">
          {params.inputs.map((e, index) => {
            if (index > 4)
              return (
                <React.Fragment>
                  <InputLabel htmlFor={e.htmlFor}>{e.label}</InputLabel>
                  <TextField name={e.name} type="file" onChange={(e)=>console.log(e.target.value)}/>
                </React.Fragment>
              );
          })}
        </div>
      </div>
      <div className="button">
        <Button type="submit" variant="contained" color="primary">
          Apply
        </Button>
      </div>
    </form>
  );
};

export default Form;
