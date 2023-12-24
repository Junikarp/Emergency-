import { useState } from "react";
import LoginForm from "./LoginForm";
import AuthComponent from "./AuthComponent";

const Login = () => {
  const [token, setToken] = useState(null);

  const handleLogin = async (newToken) => {
    setToken(newToken);
    console.log(newToken);
  };
  return (
    <div>
      {/* 토큰 있으면 인증된 컴포넌트 보여주고, 없으면 로그인 폼 렌더링시키기 */}
      {token ? (
        <AuthComponent token={token} />
      ) : (
        <div>
          <LoginForm onLogin={handleLogin} />
        </div>
      )}
    </div>
  );
};

export default Login;
