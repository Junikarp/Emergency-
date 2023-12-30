import { useEffect, useState } from "react";
import FooterNav from "../FooterNav";
import SearchInput from "../api/SearchInput";
import { Link, useNavigate } from "react-router-dom";
import Category from "../api/Category";
import EmergencyMap from "../api/EmergencyMap";
import "./Home.css";

function Home() {
  //로그인 상태 저장
  const [isLogin, setIsLogin] = useState(false);
  const [order, setOrder] = useState("emergency");
  const navigate = useNavigate();
  //로그인 됐는지 토큰 가져와서 상태 확인
  useEffect(() => {
    const existToken = localStorage.getItem("token");
    //토큰 있으면 로그인 ㅅ아태
    setIsLogin(existToken);
  }, []);
  const handleButtonClick = (component) => {
    setOrder(component);
  };

  const renderComponent = () => {
    switch (order) {
      case "search":
        return <SearchInput />;
      case "category":
        return <Category />;
      case "emergency":
        return <EmergencyMap />;
    }
  };

  //로그아웃
  const handleLogout = () => {
    //로그아웃 누르면 토큰 삭제
    localStorage.removeItem("token");
    //홈으로 이동
    navigate("/");
    setIsLogin(false);
    const handleLogout = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/logout`, {
          method: "GET",
          credentials: "same-origin",
        });
        if (response.ok) {
          //로그아웃 누르면 토큰 삭제
          localStorage.removeItem("token");
          setIsLogin(false);
          // //홈으로 이동
          navigate("/");
        } else {
          console.error("로그아웃 실패");
        }
      } catch (error) {
        console.error("에러남", error);
      }
    };
  };
  return (
    <>
      <div className="home-container">
        <div className="home-button-container">
          <button
            className="home-button home-button--aylen home-button--round-l home-button--text-thick"
            onClick={() => handleButtonClick("search")}
          >
            검색
          </button>
          <button
            className="home-button home-button--aylen home-button--round-l home-button--text-thick"
            onClick={() => handleButtonClick("emergency")}
          >
            응급실 현황
          </button>
          <button
            className="home-button home-button--aylen home-button--round-l home-button--text-thick"
            onClick={() => handleButtonClick("category")}
          >
            주변 병원/약국 찾기
          </button>
        </div>
        <div>{renderComponent()}</div>
      </div>
      <div>
        <div>
          <FooterNav />
        </div>
        {/* {isLogin ? (
          // 로그인 상태일 때 로그아웃 버튼 렌더링
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          // 로그인 상태가 아닐 때 로그인 버튼 렌더링
          <>
            <Link to="/login">
              <button>로그인</button>
            </Link>
            <Link to="/register">
              <button>회원가입</button>
            </Link>
          </>
        )} */}
      </div>
    </>
  );
}

export default Home;
