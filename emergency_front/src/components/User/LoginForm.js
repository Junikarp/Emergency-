import "./LoginForm.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import FooterNav from "../FooterNav";
import cross from "../../assets/logincross.png";

const LoginForm = ({ onLogin }) => {
  const imgStyle = {
    width: "50px",
    height: "50px",
  };
  //입력한 값 상태 저장
  const [credentials, setCredentials] = useState({
    id: "",
    password: "",
  });

  //input에 값 변할때 마다 호출
  const handleChange = (e) => {
    const { id, value } = e.target;
    //상태 업데이트 해주기
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [id]: value,
    }));
  };

  //로그인 버튼 누르면 호출
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //서버로 로그인 요청
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log(credentials);
      //서버 응답 정상일 경우
      if (response.ok) {
        // json으로 데이터 가져온다
        const result = await response.json();

        //로그인 성공하면 상태 올리면서 토큰 전달
        onLogin(result["access-token"]);
      } else {
        console.error("로그인 실패");
      }
    } catch (error) {
      console.log(error);
      console.error("로그인 중 오류", error);
    }
  };
  return (
    <div className="loginForm">
      <div className="loginForm-container-global">
        <div className="loginForm-head">
          <img src={cross} style={imgStyle} />
        </div>
        <div className="loginForm-container">
          <div className="loginForm-headline">
            <h2>Login</h2>
          </div>
          <div className="loginForm-global">
            <form className="loginForm-box">
              <input
                className="loginForm-input"
                onChange={handleChange}
                type="text"
                id="id"
                placeholder="ID"
              />
              <input
                className="loginForm-input"
                onChange={handleChange}
                type="password"
                id="password"
                placeholder="PASSWORD"
              />
              <div className="loginForm-button">
                <button id="login" type="submit" onClick={handleSubmit}>
                  Login
                </button>
                {/* <button className="register-button"> */}
                <Link id="regist-link" to="/register">
                  Create an account?
                </Link>
                {/* </button> */}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <FooterNav />
      </div>
    </div>
  );
};

export default LoginForm;
