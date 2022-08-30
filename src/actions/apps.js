import * as api from "../api";


export const LoginStudent = (user) => async (dispatch) => {
  try {
    // const auth =  useContext(authCotext)

    const { data } = await api.LoginStudent(user);
    console.log(data);
    dispatch({ type: "LOGIN", payload: data });
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};

export const createVisa = (app, token) => async (dispatch) => {
  try {
    console.log(token);
    const { data } = await api.createVisa(app, token);
    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const createi_kad = (app, token) => async (dispatch) => {
  try {
    const { data } = await api.creatI_kad(app, token);
    dispatch({ type: "CREATE", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const getAppByUserId = (token, id) => async (dispatch) => {
  try {
    console.log(token);
    const { data } = await api.getAppByUserId(token, id);
    dispatch({ type: "FETCH", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const Reupload = (token, id, app) => async (dispatch) => {
  try {
    console.log(app.get("re_upload_uploads"));
    console.log("hi");
    const { data } = await api.re_Upload(token, app, id);
    console.log(app);
    dispatch({ type: "UPLOAD", payload: data });
  } catch (err) {
    console.log(err);
  }
};
export const Check = (token, id, app) => async (dispatch) => {
  try {
    console.log(token);
    const { data } = await api.check(token, app, id);
    console.log(app);
    dispatch({ type: "UPLOAD", payload: data });
  } catch (err) {
    console.log(err);
  }
};

export const uploadPayment = (token, id, app) => async (dispatch) => {
  try {
    const { data } = await api.Payment(token, id, app);
    dispatch({ type: "UPLOAD", payload: data });
  } catch (err) {
    console.log(err);
  }
};


export const getStudentId = (userId) => async(dispatch) => {
  try {
    // console.log(token);
    const { data } = await api.getStudent(userId);
    console.log(data)
    dispatch({ type: "FETCHUSER", payload: data });
  } catch (err) {
    console.log(err.message);
    console.log("err")
  }
};
