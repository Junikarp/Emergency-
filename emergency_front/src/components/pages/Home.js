import { useEffect, useState } from "react";
import FooterNav from "../FooterNav";
import SearchInput from "../api/SearchInput";
import { Link, useNavigate } from "react-router-dom";

function Home() {
  //로그인 상태 저장
  const [isLogin, setIsLogin] = useState(false);
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

  return (
    <>
      <div>
        <SearchInput />
      </div>
      <div>
        <FooterNav />
        <h2>홈이유</h2>
        {isLogin ? (
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
        )}
      </div>
    </>
  );
}

export default Home;
