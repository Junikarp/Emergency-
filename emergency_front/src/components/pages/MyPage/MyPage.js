import FooterNav from "../../FooterNav";
import { Link } from "react-router-dom";
import MyPageContainer from "./MyPageContainer";
import Login from "../../User/Login";
import allergyImg from "../../../assets/allergy.png"
import medicationImg from "../../../assets/medication.png"
import virusImg from "../../../assets/virus.png"
import myinfoImg from "../../../assets/myinfo.png"
import "../MyPage/MyPage.css"

const MyPage = ({ token }) => {
  const imgStyle = {
    width: "72px",
    height: "72px",
    float: 'left'
  };
  return (
    <>
      {token !== null ? (
        <>
          <div id="mypage-main">
            <h2>마이페이지</h2>
            <div id="mypage-name-box">
              권준구 님
            </div>
            <div id="mypage-button-box">
              <MyPageContainer>
                <div id="mypage-small-button-box">
                    <Link to="/mypage/mypagedetail">
                      <div class="mypage-button">
                        <div className="mypage-button-img">
                        <img src={myinfoImg} style={imgStyle}/>
                        </div>
                        <div className="mypage-button-text">
                           <p id="mypage-button-text">마이페이지</p>
                        </div>
                       </div></Link>
                    <Link to="/mypage/disease">
                      <div class="mypage-button">
                      <div className="mypage-button-img">
                        <img src={virusImg} style={imgStyle}/>
                        </div>
                        <div className="mypage-button-text">
                           <p id="mypage-button-text">내 질환</p>
                        </div>
                       </div></Link>
                </div>
                <div id="mypage-small-button-box">
                    <Link to="/mypage/takingmedicine"><div class="mypage-button"><img src={medicationImg} style={imgStyle}/><p id="mypage-button-text">복용약</p></div></Link>
                    <Link to="/mypage/allergy"><div class="mypage-button"><img src={allergyImg} style={imgStyle}/><p id="mypage-button-text">내 알레르기</p></div></Link>
                </div>
              </MyPageContainer>
            </div>
          </div>
          <FooterNav />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MyPage;
