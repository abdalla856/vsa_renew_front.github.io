import React ,{useEffect} from "react";
import "./ProfilePage.css";
import NavBar from "../../shared/components/Navigation/NavBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getStudentId } from "../../../actions/apps";
import Moment from 'moment';
function ProfilePage() {



  let Userid = "";
  if (JSON.parse(localStorage.getItem("userData"))) {
    const {  userId } = JSON.parse(localStorage.getItem("userData"));
    Userid = userId;
  }
  const dispatch = useDispatch();



  useEffect(() => {
    try {
      dispatch(getStudentId(Userid));
      console.log(111);
    } catch (err) {
      console.log(err);
    }
  },[]);
 
  const user = useSelector((state) => state.user);
  console.log(user);

  let name =[]
  if(user.student !== undefined){
    name = user.student.fullName.split(' '); 
  }

let photo , fullName , MatricNumber , passport , hometown , address , faculty , major = ""
let birth , issue= null

if(user.student !== undefined){
  photo = 'http://localhost:5000/'+user.student.photo.replace(/\\/g, "/")
  fullName = user.student.fullName
  MatricNumber = user.student.matric
  passport = user.student.passport
  hometown = user.student.HomeTown
  address = user.student.address
  faculty = user.student.faculty
  major = user.student.major
  birth = Moment(user.student.DateOfBirth).format('DD-MM-YYYY')
  issue = Moment(user.student.DateOfIssue).format('DD-MM-YYYY')
}






  return (
    <React.Fragment>
      <NavBar />
      <div class="card-container">
        <img
          class="round"
          src={photo}
          alt="user"
        />
        <h3>{name[0]} {name.at(-1)}</h3>
        <h6>{hometown}</h6>
        <p>
          {faculty}
          <br /> {major}
        </p>
        <div class="buttons">
          <div class="primary">date of issue</div>
          <div class="primary ghost">{issue}</div>
        </div>
        <div class="skills">
          <h6 style= {{textAlign: 'center'}}>Full Information </h6>
          <div className ="Con_dt">
            <dl>
              <dt>Full name</dt>
              <dd>{fullName}</dd>
              <dt>Matric Number</dt>
              <dd>{MatricNumber}</dd>
              <dt>Passport Numbver</dt>
              <dd>{passport}</dd>
              <dt>Date of birth</dt>
              <dd> {birth}</dd>
              <dt>Hometown</dt>
              <dd>{hometown}</dd>
              <dt>Address</dt>
              <dd>{address}</dd>
            
           
            </dl>
          </div>
        </div>
		<button className ="back_home">
			<Link to = "/user" style ={{textDecoration :"None" ,color : "#1F1A36"}}>Home</Link>
		</button>
      </div>
    </React.Fragment>
  );
}

export default ProfilePage;
