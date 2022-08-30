import React from "react";
import Login from "./view/Login";
import Dashboard from "./view/students/Dashboard/Dashboard";
import VisaApplication from "./view/students/Applications/visaApplcation";
import IkadApplicatoin from "./view/students/Applications/i-kadApplication";
import Payment from "./view/students/Payment/Payment";
import Reupload from "./view/students/re-upload/Re-upload";
import Progress from "./view/students/Progress/progress";
import { authCotext } from "./view/shared/context/auth-context";
// import { useDispatch } from "react-redux";

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,

} from "react-router-dom";


import Clerk_dashboard from "../src/view/clerks/Dashboard/Dashboard";
import { useAuth } from "./view/shared/hooks/auth-hook";
import LoginClerk from "../src/view/clerks/Login/LoginClerk";
import Newapp from "../src/view/clerks/New_App/NewApp";
import Reuploadc from "../src/view/clerks/reupload/Reupload";
import Paymentc from "../src/view/clerks/Payment/Payment";
import Approvedc from "../src/view/clerks/Approved/Approved";
import Newcheck from "../src/view/clerks/Newcheck/Newcheck";
import PaymentCheck from "../src/view/clerks/PaymentCheck/PaymentCheck"
import ReuploadCheck from '../src/view/clerks/Re_uploadCheck/reuploadCheck'
import FinishedPreview from "./view/clerks/FinishedReview/finishedPreview"
import ProfilePage from "./view/students/ProfileInfo/ProfilePage"
import StudentPage from './view/clerks/StudentInfo/StudentPage'
// import AdminDashboard from "./view/admin/dashboard/Dashboard"
function App() {
  const {  login, logout, userId } = useAuth();
  let tokenUser =-false
   let typeUser =""
if(JSON.parse(localStorage.getItem("userData"))){
  const {token ,type} =JSON.parse(localStorage.getItem("userData"))
  tokenUser= token 
  typeUser = type
}
// const token_i= token ;
// const type_i= type ;

  let routes;

  if (tokenUser && typeUser=== "student") {
  
    routes = (
      <Switch>
        <Route path="/user" exact>
          <Dashboard />
        </Route>

        <Route path="/visaApplication" exact>
          <VisaApplication />
        </Route>
        <Route path="/ikadApplication" exact>
          <IkadApplicatoin />
        </Route>
        <Route path="/payment" exact>
          <Payment />
        </Route>
        <Route path="/re-upload" exact>
          <Reupload />
        </Route>
        <Route path="/progress" exact>
          <Progress />
        </Route>
        <Route path="/userInfo" exact>
          <ProfilePage />
        </Route>

        <Redirect to="/user" />
      </Switch>
    );
  } else if (tokenUser && typeUser == "clerk") {

    routes = (
      <BrowserRouter>
        <Switch>
          <Route path="/clerk_dash" exact>
            <Clerk_dashboard />
          </Route>
          
          <Route path="/newapp" exact>
            <Newapp />
          </Route>
          <Route path="/reupload" exact>
            <Reuploadc />
          </Route>
          <Route path="/paymentc" exact>
            <Paymentc />
          </Route>
          <Route path="/approved" exact>
            <Approvedc />
          </Route>
          <Route path="/new_check/:type/:id" exact>
            <Newcheck />
          </Route>
          <Route path="/re_upload_check/:type/:id" exact>
            <ReuploadCheck />
          </Route>
          <Route path="/finished_preview/:type/:id" exact>
            <FinishedPreview />
          </Route>
          <Route path="/payment_check/:id" exact>
          <PaymentCheck/>
          </Route>
          <Route  exact path="/student_info/:id" >
          <StudentPage/>

          </Route>
          <Route  exact path="*" >
          <Clerk_dashboard/>

          </Route>
        </Switch>
      </BrowserRouter>
    );
  } else if (!tokenUser) {
    routes = (
      <BrowserRouter>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/clogin" exact>
            <LoginClerk />
          </Route>
          {/* <Route path="/admin" exact>
            <AdminDashboard />
          </Route> */}
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }

  return (
    <authCotext.Provider
      value={{
        isLoggedIn: !!tokenUser || !!userId,
        userId: userId,
        token: tokenUser,
        login: login,
        logout: logout,
      }}
    >
      <BrowserRouter>
        <main>{routes}</main>
      </BrowserRouter>
    </authCotext.Provider>
  );
}

export default App;
