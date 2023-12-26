import { useState, useEffect } from "react";
import LoginForm from "./LoginForm";
import MyPage from "../pages/MyPage/MyPage"; // MyPage 컴포넌트를 import
import { useNavigate } from "react-router-dom";
import FooterNav from "../FooterNav";
const Login = () => {
  const [token, setToken] = useState(null);
  //사용자 정보 받아올것
  const navigate = useNavigate();
  const handleLogin = async (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
    console.log(newToken);
    navigate("/");
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <div>
      {/* 토큰 있으면 인증된 컴포넌트 보여주고, 없으면 로그인 폼 렌더링시키기 */}
      {token ? (
        // MyPage 컴포넌트에 token, user 전달
        <MyPage token={token} />
      ) : (
        <div>
          <LoginForm onLogin={handleLogin} />
          <FooterNav />
        </div>
      )}
    </div>
  );
};

export default Login;
