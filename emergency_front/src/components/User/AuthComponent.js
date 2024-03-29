import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom"; // useHistory 대신 useNavigate 사용

const AuthComponent = ({ token }) => {
  // 사용자 정보 담아주기
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate(); // useNavigate 훅 사용

  // 토큰이 바뀌거나 컴포넌트 뜰 때
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token) {
          return;
        }

        // 토큰 디코딩
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        // 백엔드로 사용자 정보 요청(인증된 사용자)
        const response = await fetch(
          `http://localhost:8080/api/user/${userId}`,
          {
            method: "GET",
            headers: {
              // Auth 헤더에 토큰 추가해서 인증 요청하기
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const user = await response.json();
          setUserData(user);
          // home으로 바꿔주기
          console.log(user);
          console.log(token);
          navigate("/");
        } else {
          // 요청 실패
          console.error("인증실패");
          // console.log(token);
        }
      } catch (error) {
        console.log(error);
        console.error("요청 중 오류");
      }
    };

    fetchUserData();
  }, [token, navigate]); // 토큰 변경될 때마다 함수 다시 실행하기

  return <></>;
};

export default AuthComponent;
