import FooterNav from "../FooterNav";
import EmergencyMap from "../api/EmergencyMap";
import Category from "../api/Category";
import SearchInput from "../api/SearchInput";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

  //로그아웃
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
  return (
    <>
      <div>
        <button onClick={() => handleButtonClick("search")}>
          병원/약국검색
        </button>
        <button onClick={() => handleButtonClick("emergency")}>
          응급실 현황
        </button>
        <button onClick={() => handleButtonClick("category")}>
          카테고리 테스트
        </button>
      </div>
      <div>
        <div>{renderComponent()}</div>
        <div>
          <FooterNav />
        </div>
      </div>
    </>
  );
}

export default Home;
