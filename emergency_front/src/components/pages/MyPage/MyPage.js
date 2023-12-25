import FooterNav from "../../FooterNav";
import { Link, useNavigate } from "react-router-dom";
import MyPageContainer from "./MyPageContainer";
import { useEffect, useCallback } from "react";
import Login from "../../User/Login";
const MyPage = ({ token }) => {
  console.log(token);
  const navigate = useNavigate();
  // console.log(token);

  const handleNavigate = useCallback(() => {
    // 토큰이 없을 때만 로그인 페이지로 이동
    if (token === null) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (token !== null) {
      handleNavigate();
    }
  }, [handleNavigate, token]);

  // useEffect(() => {
  //   handleNavigate();
  // }, [token, handleNavigate]);

  return (
    <>
      {token !== null ? (
        <>
          <h2>마이페이지</h2>
          <MyPageContainer>
            <Link to="/mypage/mypagedetail">마이페이지 상세</Link>
            <Link to="/mypage/ouchandallergy">질병 및 알레르기</Link>
            <Link to="/mypage/diagnosishx">진료 기록</Link>
            <Link to="/mypage/takingmedicine">복용약</Link>
            <Link to="/mypage/emergencyhp">비상연락망</Link>
          </MyPageContainer>
          <FooterNav />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MyPage;
