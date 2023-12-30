import FooterNav from "../../FooterNav";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./MyPageDetail.css";
import mypageImg from "../../../assets/myinfo.png";

const MyPageDetail = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existToken = localStorage.getItem("token");
        setToken(existToken);

        if (existToken) {
          const userToken = jwtDecode(existToken);
          const decodedId = userToken.id;

          const response = await fetch(
            `http://localhost:8080/api/user/${decodedId}`
          );
          if (response.ok) {
            const data = await response.json();
            setUserInfo(data);
            console.log(data);
          } else {
            console.error(
              "사용자 정보를 가져오는 중 오류:",
              response.statusText
            );
          }
        }
      } catch (error) {
        console.error("사용자 정보를 가져오는 중 오류:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdatePage = () => {
    navigate("/mypage/mypagedetail/update");
  };

  const handleMypage = () => {
    navigate("/mypage");
  };

  return (
    <>
      {/* userInfo 응답와야 렌더링되게끔! */}
      {userInfo && (
        <div>
          <div id="name-box">
            <p>{userInfo.name} 님 </p>{/* 이름과 ID를 표시합니다. */}
          </div>
          <div id="myinfo-main-con">
            <div id="myinfo-main-con-title">
              <img src={mypageImg} id="myinfoImg"></img>
              <p>마이페이지</p>
            </div>
            <table id="myinfo-table">
              <tbody>
                <tr>
                  <td>아이디</td>
                  <td>{userInfo.id}</td>
                </tr>
                <tr>
                  <td>이름</td>
                  <td>{userInfo.name}</td>
                </tr>
                <tr>
                  <td>신장</td>
                  <td>{userInfo.height}</td>
                </tr>
                <tr>
                  <td>몸무게</td>
                  <td>{userInfo.weight}</td>
                </tr>
                <tr>
                  <td>혈액형</td>
                  <td>
                    {userInfo.bloodtypeRh} {userInfo.bloodtypeABO}
                  </td>
                </tr>
                <tr>
                  <td>보호자 연락처</td>
                  <td>{userInfo.guardianTel}</td>
                </tr>
              </tbody>
            </table>
            <div id="myinfo-button-con">
              <button id="myinfo-update" onClick={handleUpdatePage}>
                수정
              </button>
              <button id="myinfo-cancel" onClick={handleMypage}>
                취소
              </button>
            </div>
          </div>
        </div>
      )}
      <FooterNav />
    </>
  );
};

export default MyPageDetail;
