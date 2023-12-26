import { useState } from "react";
import LoginForm from "./LoginForm";
import AuthComponent from "./AuthComponent";
import MyPage from "../pages/MyPage/MyPage"; // MyPage 컴포넌트를 import
import { useNavigate } from "react-router-dom";
import FooterNav from "../FooterNav";
const Login = () => {
  const [token, setToken] = useState(null);

  const handleLogin = async (newToken) => {
    setToken(newToken);
  };
  return (
    <div>
      {/* 토큰 있으면 인증된 컴포넌트 보여주고, 없으면 로그인 폼 렌더링시키기 */}
      {token ? (
        <AuthComponent token={token} />
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
