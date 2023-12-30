//상세정보 수정페이지
import FooterNav from "../../FooterNav";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import mypageUpdateImg from "../../../assets/mypageupdate.png"
import "./MyPageDetailUpdate.css"

const MyPageDetailUpdate = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    height: 0,
    weight: 0,
    guardianTel: "",
  });
  const navigate = useNavigate();
  const [pwMsg, setPwMsg] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState("");

  const validatePw = (password) => {
    console.log(password);
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
    // setPassword(password);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 비밀번호 유효 검사
    if (name === "password") {
      setUserInfo((prevData) => ({ ...prevData, [name]: value }));

      if (!validatePw(value)) {
        setPwMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요");
      } else {
        setPwMsg("");
      }
    } else if (name === "passwordCheck") {
      // 비밀번호 확인 일치 여부 검사
      setUserInfo((prevData) => ({ ...prevData, [name]: value }));

      const isPasswordMatch = value === userInfo.password;
      setPwCheckMsg(isPasswordMatch ? "" : "비밀번호가 일치하지 않습니다.");
    } else {
      setUserInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if (response.ok) {
        console.log("수정완료");
        navigate("/mypage/mypagedetail");
      } else {
        console.error("실패");
      }
    } catch (error) {
      console.error("수정 오류", error);
    }
  };

  return (
    <>
      <div id="mypage-update-title">
        <img src={mypageUpdateImg} id="mypageUpdateImg"></img>
        내 정보 수정
      </div>
      <div id="myinfo-update-main-con">
        {userInfo && (
          <form onSubmit={handleSubmit} id="myinfo-update-form">
            <table id="myinfo-update-table">
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
                  <td>비밀번호</td>
                  <td>
                    <input id="mypage-update-input"
                      value={userInfo.password}
                      type="password"
                      name="password"
                      onChange={handleInputChange}
                    />
                    <p className="message">{pwMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td>비밀번호 확인</td>
                  <td>
                    <input id="mypage-update-input"
                      type="password"
                      name="passwordCheck"
                      onChange={handleInputChange}
                    />
                    <p className="message">{pwCheckMsg}</p>
                  </td>
                </tr>
                <tr>
                  <td>신장</td>
                  <td>
                    <input id="mypage-update-input"
                      type="number"
                      value={userInfo.height}
                      name="height"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>몸무게</td>
                  <td>
                    <input id="mypage-update-input"
                      type="number"
                      value={userInfo.weight}
                      name="weight"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
                <tr>
                  <td>혈액형</td>
                  <td>
                    {userInfo.bloodtypeRh} {userInfo.bloodtypeABO}
                  </td>
                </tr>
                <tr>
                  <td>보호자 연락처</td>
                  <td>
                    <input id="mypage-update-input"
                      type="tel"
                      name="guardianTel"
                      pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
                      onChange={handleInputChange}
                      value={userInfo.guardianTel}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div id="myinfo-update-button-con">
              <button id="myinfo-update-button" type="submit">확인</button>
              <button id="myinfo-update-cancel-button">취소</button>
            </div>
          </form>
        )}
      </div>
      <FooterNav></FooterNav>
    </>
  );
};

export default MyPageDetailUpdate;
