import { Link } from "react-router-dom";
import Container from "./Container";
const FooterNav = () => {
  return (
    <div>
      <Container>
        <Link to="/">Home</Link>
        <Link to="/chatbot">ChatBot</Link>
        <Link to="/firstaid">FirstAid</Link>
        <Link to="/mypage">MyPage</Link>
      </Container>
    </div>
  );
};

export default FooterNav;
