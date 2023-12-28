import { useState } from "react";
import "./FirstAid.css";
function FirstAidListItem({ item }) {
  const style = {
    width: "500px",
    height: "500px",
  };
  return (
    <div className="FirstAidListItem">
      <div>
        <div>
          <h1>{item.title}</h1>
        </div>
        <div>
          <img
            className="FirstAidListItem-img"
            style={style}
            src={item.imgUrl}
            alt={item.title}
          ></img>
          <div>
            <span
              className="FirstAidListItem-content"
              dangerouslySetInnerHTML={{ __html: item.content }}
            ></span>
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
      {items.map((item) => (
        <>
          <div className="box bg-1">
            <button
              className="button button--winona button--border-thin button--round-s"
              onClick={() => handleClick(item)}
              data-text={item.title}
            >
              <span>{item.title}</span>
            </button>
            <div key={item.id}>
              {selectedItem && selectedItem.id === item.id && (
                <FirstAidListItem item={item} />
              )}
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

export default FirstAidList;
