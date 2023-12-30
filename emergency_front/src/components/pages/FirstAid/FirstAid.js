import FooterNav from "../../FooterNav";
import FirstAidList from "./FirstAidList";
import items from "./mock.json";
import "./FirstAid.css";
const FirstAid = () => {
  return (
    <>
      <div>
        <div className="firstaid-header">
          <h1>기본 응급처치</h1>
        </div>
        <div>
          <FirstAidList items={items} />
        </div>
      </div>
      <FooterNav />
    </>
  );
};

export default FirstAid;
