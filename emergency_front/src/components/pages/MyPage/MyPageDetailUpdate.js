//상세정보 수정페이지
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const MyPageDetailUpdate = () => {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState({
    id: "",
    password: "",
    passwordCheck: "",
    name: "",
    height: 0,
    weight: 0,
    guardianTel: "",
  });
  const navigate = useNavigate();
  const [pwMsg, setPwMsg] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState("");

  const validatePw = (password) => {
    console.log(password);
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
    // setPassword(password);
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // 비밀번호 유효 검사
    if (name === "password") {
      setUserInfo((prevData) => ({ ...prevData, [name]: value }));

      if (!validatePw(value)) {
        setPwMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요");
      } else {
        setPwMsg("");
      }
    } else if (name === "passwordCheck") {
      // 비밀번호 확인 일치 여부 검사
      setUserInfo((prevData) => ({ ...prevData, [name]: value }));

      const isPasswordMatch = value === userInfo.password;
      setPwCheckMsg(isPasswordMatch ? "" : "비밀번호가 일치하지 않습니다.");
    } else {
      setUserInfo((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      if (response.ok) {
        console.log("수정완료");
        navigate("/mypage/mypagedetail");
      } else {
        console.error("실패");
      }
    } catch (error) {
      console.error("수정 오류", error);
    }
  };

  return (
    <>
      <div>
        <h2>상세정보 수정</h2>
        {userInfo && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="id">아이디</label>
            <input
              type="text"
              id="id"
              name="id"
              value={userInfo.id}
              disabled // 수정 불가능한 상태로 설정
            />
            <label htmlFor="name">이름</label>
            <input
              type="text"
              name="name"
              onChange={handleInputChange}
              value={userInfo.name}
            />
            <label htmlFor="password">비밀번호</label>
            <input
              value={userInfo.password}
              type="password"
              name="password"
              onChange={handleInputChange}
            />
            <p className="message">{pwMsg}</p>
            <label htmlFor="passwordCheck">비밀번호 확인</label>
            <input
              type="password"
              name="passwordCheck"
              onChange={handleInputChange}
            />
            <p className="message">{pwCheckMsg}</p>
            <label htmlFor="height">신장</label>
            <input
              type="number"
              value={userInfo.height}
              name="height"
              onChange={handleInputChange}
            />
            <label htmlFor="weight">몸무게</label>
            <input
              type="number"
              value={userInfo.weight}
              name="weight"
              onChange={handleInputChange}
            />
            <p>
              혈액형 {userInfo.bloodtypeRh} {userInfo.bloodtypeABO}
            </p>
            <label htmlFor="guardianTel">보호자 연락처</label>
            <input
              type="tel"
              name="guardianTel"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              onChange={handleInputChange}
              value={userInfo.guardianTel}
            />
            <button type="submit">수정 완료</button>
          </form>
        )}
      </div>
    </>
  );
};

export default MyPageDetailUpdate;
