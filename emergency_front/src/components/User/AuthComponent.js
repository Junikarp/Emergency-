// 인증관리 컴포넌트
import { useState, useEffect } from "react";
import jwt_decode, { jwtDecode } from "jwt-decode";

const AuthComponent = ({ token }) => {
  // 사용자 정보 담아주기
  const [userData, setUserData] = useState(null);

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
        } else {
          // 요청 실패
          console.error("인증실패");
          console.log(token);
        }
      } catch (error) {
        console.log(error);
        console.error("요청 중 오류");
      }
    };

    fetchUserData();
  }, [token, userData]); // 토큰 변경될 때마다 함수 다시 실행하기

  return (
    <div>
      {userData ? <h3>안녕하세요, {userData.name}님!</h3> : <h2>인증중</h2>}
    </div>
  );
};

export default AuthComponent;
