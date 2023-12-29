import { useState } from "react";
import MapSearch from "./MapSearch";
import "./SearchInput.css";

function SearchInput() {
  const [input, setInput] = useState(""); // input 검색어 관리
  const [place, setPlace] = useState(""); // 입력 값 관리

  const onChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(input);
    setInput("");
  };

  return (
    <>
      <div>
        <div className="form-container">
          <form className="form-style" onSubmit={handleSubmit}>
            <input
              className="searchInput"
              placeholder="장소를 입력하세요"
              onChange={onChange}
              value={input}
            ></input>
            <button className="searchInputButton" type="submit">
              검색
            </button>
          </form>
        </div>
        <div>
          <MapSearch searchPlace={place}></MapSearch>
        </div>
      </div>
    </>
  );
}

export default SearchInput;
