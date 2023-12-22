import FooterNav from "../../FooterNav";
import { Link } from "react-router-dom";
import MyPageContainer from "./MyPageContainer";

const MyPage = () => {
  return (
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
  );
};

export default MyPage;
