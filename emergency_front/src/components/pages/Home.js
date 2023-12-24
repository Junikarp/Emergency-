import FooterNav from "../FooterNav";
import SearchInput from "../api/SearchInput";
import { Link } from "react-router-dom";
function Home() {
  return (
    <>
      <div>
        <SearchInput />
      </div>
      <div>
        <FooterNav />
        <h2>홈이유</h2>
        <Link to="/login">
          <button>로그인</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
