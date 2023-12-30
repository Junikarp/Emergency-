import { useState } from "react";
import "./FirstAid.css";
function FirstAidListItem({ item }) {
  const style = {
    // width: "500px",
    // height: "500px",
  };
  return (
    <div className="FirstAidListItem">
      <div className="firstaidItemContainer">
        <div className="item-detail">
          <span className="highlight">{item.title}</span>
        </div>
        <div className="detail-container">
          <div className="item-detail">
            <img
              className="FirstAidListItem-img"
              style={style}
              src={item.imgUrl}
              alt={item.title}
            ></img>
          </div>
          <div className="item-detail">
            <div
              className="FirstAidListItem-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FirstAidList({ items }) {
  // mockJson 데이터 아이템으로 받아오기
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = (item) => {
    setSelectedItem(item);
  };
  return (
    <div className="firstaidMain">
      <div className="box bg-1">
        {items.map((item) => (
          <button
            key={item.id}
            className="button button--winona button--border-thin button--round-s"
            onClick={() => handleClick(item)}
            data-text={item.title}
          >
            <span>{item.title}</span>
          </button>
        ))}
      </div>
      <div className="selected-item">
        {selectedItem && <FirstAidListItem item={selectedItem} />}
      </div>
    </div>
  );
}

export default FirstAidList;
