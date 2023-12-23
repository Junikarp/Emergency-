import FooterNav from "../FooterNav";
import SearchInput from "../api/SearchInput";

function Home() {
  return (
    <>
      <div>
        <SearchInput />
      </div>
      <div>
        <FooterNav />
        <h2>홈이유</h2>
      </div>
    </>
  );
}

export default Home;
