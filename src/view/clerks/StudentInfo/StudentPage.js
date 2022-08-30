import React ,{useEffect} from "react";
import "./StudentPage.css";
import Navbar from "../Dashboard/components/Navbar/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getStudentId } from "../../../actions/apps";
import Moment from 'moment';
import { useParams } from "react-router-dom";

function StudentPage() {



  const { id } = useParams();

  const dispatch = useDispatch();



  useEffect(() => {
    try {
      dispatch(getStudentId(id));
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
      <Navbar />
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
			<Link to = "/clerk_dash" style ={{textDecoration :"None" ,color : "#1F1A36"}}>Home</Link>
		</button>
      </div>
    </React.Fragment>
  );
}


export default StudentPage;
