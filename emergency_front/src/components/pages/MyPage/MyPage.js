import FooterNav from "../../FooterNav";
import { Link } from "react-router-dom";
import MyPageContainer from "./MyPageContainer";
import Login from "../../User/Login";

const MyPage = ({ token }) => {
  return (
    <>
      {token !== null ? (
        <>
          <h2>마이페이지</h2>
          <MyPageContainer>
            <Link to="/mypage/mypagedetail">마이페이지 상세</Link> |
            <Link to="/mypage/disease">내 질환</Link> |
            <Link to="/mypage/diagnosishx">진료 기록</Link> |
            <Link to="/mypage/takingmedicine">복용약</Link> |
            <Link to="/mypage/allergy">내 알레르기</Link>
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
