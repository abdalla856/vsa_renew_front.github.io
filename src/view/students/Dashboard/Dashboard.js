import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import "swiper/swiper.min.css";
// import "swiper/css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";
import VisaApply from "./components/visaApply";
import Footer from "./components/footer";
// import "./styles.css";
import { useDispatch } from "react-redux";
import { getAppByUserId } from "../../../actions/apps";
import { getStudentId } from "../../../actions/apps";
import { useContext } from "react";
import { authCotext } from "../../shared/context/auth-context";
import { useSelector } from "react-redux";
import "./Dashboard.css";
import NavBar from "../../shared/components/Navigation/NavBar";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";

SwiperCore.use([Navigation, Pagination, Autoplay]);
const Dashboard = () => {
  const auth = useContext(authCotext);
  let tokenUser = false;
  let Userid = "";
  if (JSON.parse(localStorage.getItem("userData"))) {
    const { token, userId } = JSON.parse(localStorage.getItem("userData"));
    tokenUser = token;
    Userid = userId;
  }
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(getAppByUserId(tokenUser, Userid));
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch, tokenUser, Userid]);
  useEffect(() => {
    try {
      dispatch(getStudentId(Userid));
      console.log(111);
    } catch (err) {
      console.log(err);
    }
  },[]);
  const data = useSelector((state) => state.apps);
  

  return (
    <React.Fragment>
      <nav>
        <NavBar  />
      </nav>
      <div className="container_dash">
        <img
          className="img_in_dashboard"
          src={
            "http://alamiyyah.usim.edu.my/wp-content/uploads/2021/08/study-2.png"
          }
        />
      </div>
      <div className="container_dash">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          slidesPerView={1}
          // loop= {true}
          // loopSlides={2}
          // centeredSlides={true}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>
            <img
              className="img_in_slider"
              src={
                "https://cdn.educationmalaysia.gov.my/wp-content/uploads/2020/05/05234608/NEWS-BULLETING-eng-1110-x-456-px-01.png"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img_in_slider"
              src={
                "data:image/jpeg;base64,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"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img_in_slider"
              src={
                "https://yellow.place/file/image/cover/0/0/828/djurrqrqtzfyceua.jpg"
              }
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="img_in_slider"
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSlcTF5yI_DxeZ0kES3hgJaHCsr7Fm0e7GBw&usqp=CAU"
              }
            />
          </SwiperSlide>
        </Swiper>
      </div>
      {/* visa application part */}
      <VisaApply kind={"Visa"} link={"/visaApplication"} />
      <VisaApply kind={"i-kad"} link={"/ikadApplication"} />
      <Footer />
    </React.Fragment>
  );
};
export default Dashboard;
