import FooterNav from "../FooterNav";
import EmergencyMap from "../api/EmergencyMap";
import Category from "../api/Category";
import SearchInput from "../api/SearchInput";
import React, { useState } from "react";

function Home() {
  const [order, setOrder] = useState("emergency");
  const handleButtonClick = (component) => {
    setOrder(component);
  };

  const renderComponent = () => {
    switch (order) {
      case "search":
        return <SearchInput />;
      case "category":
        return <Category />;
      case "emergency":
        return <EmergencyMap />;
    }
  };
  return (
    <>
      <div>
        <button onClick={() => handleButtonClick("search")}>
          병원/약국검색
        </button>
        <button onClick={() => handleButtonClick("emergency")}>
          응급실 현황
        </button>
        <button onClick={() => handleButtonClick("category")}>
          카테고리 테스트
        </button>
      </div>
      <div>
        <div>{renderComponent()}</div>
        <div>
          <FooterNav />
        </div>
      </div>
    </>
  );
}

export default Home;
