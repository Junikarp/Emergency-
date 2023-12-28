import { Link } from "react-router-dom";
import Container from "./Container";
import firstaid from "../assets/firstaid.png";
import chatbot from "../assets/chatbot.png";
import home from "../assets/home.png";
import mypage from "../assets/mypage.png";
const FooterNav = () => {
  const imgStyle = {
    width: "45px",
    height: "45px",
  };

  return (
    <div>
      <Container>
        <Link to="/">
          <img src={home} style={imgStyle} />
        </Link>
        <Link to="/chatbot">
          <img style={imgStyle} src={chatbot}></img>
        </Link>
        <Link to="/firstaid">
          <img style={imgStyle} src={firstaid}></img>
        </Link>
        <Link to="/mypage">
          <img style={imgStyle} src={mypage}></img>
        </Link>
      </Container>
    </div>
  );
};

export default FooterNav;
