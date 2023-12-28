import FooterNav from "../../FooterNav";
import FirstAidList from "./FirstAidList";
import items from "./mock.json";
const FirstAid = () => {
  const firstaidHeader = {
    backgroundColor: "#141E46",
    textAlign: "center",
    color: "white",
    padding: "2px",
  };
  return (
    <>
      <div>
        <div style={firstaidHeader}>
          <h2>기본 응급처치</h2>
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
