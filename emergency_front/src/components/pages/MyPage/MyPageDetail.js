import FooterNav from "../../FooterNav";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MyPageDetail = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
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
            console.log(data);
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

  const handleUpdatePage = () => {
    navigate("/mypage/mypagedetail/update");
  };

  return (
    <>
      <h2>상세정보</h2>
      {/* userInfo 응답와야 렌더링되게끔! */}
      {userInfo && (
        <div>
          <div>
            <p>아이디 : {userInfo.id}</p>
            <p>이름 : {userInfo.name}</p>
            <p>신장 : {userInfo.height}</p>
            <p>몸무게 : {userInfo.weight}</p>
            <p>
              혈액형 : {userInfo.bloodtypeRh} {userInfo.bloodtypeABO}
            </p>
            <p>보호자 연락처 : {userInfo.guardianTel}</p>
          </div>
          <div>
            <button onClick={handleUpdatePage}>수정</button>
          </div>
        </div>
      )}
      <FooterNav />
    </>
  );
};

export default MyPageDetail;
