// RegisterForm.js
import { useEffect, useState } from "react";
import "./RegistForm.css";
import cross from "../../assets/logincross.png";

const RegisterForm = ({
  formData,
  pwMsg,
  pwCheckMsg,
  handleChange,
  handleSubmit,
}) => {
  //id 중복인지 확인하는 msg 저장하는 상태
  const [idExistMsg, setIdExistMsg] = useState(" ");
  //백에서 가져온 id저장
  const [existingIds, setExistingIds] = useState([]);
  const imgStyle = {
    width: "50px",
    height: "50px",
  };

  //모든 user의 id받아오기
  useEffect(() => {
    fetch("http://localhost:8080/api/userid")
      .then((response) => response.json())
      .then((data) => setExistingIds(data))
      .catch((error) => console.error("Error", error));
  }, []);

  //id이미 있는지 확인하기
  const checkIdValid = () => {
    const isExist = existingIds.includes(formData.id);

    const message = isExist
      ? "이미 존재하는 아이디입니다."
      : "사용가능한 아이디입니다.";
    alert(message);
  };

  const handleCheckDuplicate = async () => {
    try {
      //id 목록 다 가져오기
      const response = await fetch("http://localhost:8080/api/userid");
      const data = await response.json();
      //기존 id상태 업데이트하기
      setExistingIds(data);
      //존재하는지 확인하기
      checkIdValid();
      console.log(data);
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div className="registform-global-container">
      <div className="loginForm-head">
        <img src={cross} style={imgStyle} />
      </div>
      <div className="registform-container">
        <div className="loginForm-headline">
          <h2>Register</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div id="input-id">
            <input
              placeholder="ID"
              value={formData.id}
              type="text"
              name="id"
              //id바뀌면 다시 확인해야하니까 msg초기화해주기
              onChange={(e) => {
                handleChange(e);
                setIdExistMsg(" ");
              }}
            />
            {/* 중복검사 버튼 */}
            <button type="button" onClick={handleCheckDuplicate}>
              아이디 확인
            </button>
          </div>
          <div className="registform-input">
            <input
              placeholder="NAME"
              type="text"
              name="name"
              onChange={handleChange}
            />
          </div>
          <div className="registform-input">
            <input
              placeholder="PASSWORD"
              value={formData.password}
              type="password"
              name="password"
              onChange={handleChange}
            />
            <p className="message">{pwMsg}</p>
          </div>
          <div className="registform-input">
            <input
              placeholder="PASSWORD CHECK"
              value={formData.passwordCheck}
              type="password"
              name="passwordCheck"
              onChange={handleChange}
            />
            <p className="message">{pwCheckMsg}</p>
          </div>
          <div className="registform-input" id="height-weight-input">
            <input
              placeholder="신장 cm"
              type="number"
              name="height"
              onChange={handleChange}
            />
            <input
              placeholder="몸무게 kg"
              type="number"
              name="weight"
              onChange={handleChange}
            />
          </div>
          <div className="bloodType-container">
            <label htmlFor="bloodType">혈액형</label>
            <div className="bloodType-select">
              <select name="bloodtypeRh" onChange={handleChange}>
                <option value="Rh+">Rh+</option>
                <option value="Rh-">Rh-</option>
              </select>
              <select name="bloodtypeABO" onChange={handleChange}>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="O">O</option>
                <option value="AB">AB</option>
              </select>
            </div>
          </div>
          <div className="registform-input">
            <input
              placeholder="보호자 연락처, 010-0000-0000"
              type="tel"
              name="guardianTel"
              pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
              onChange={handleChange}
            />
          </div>
          <div className="registform-button-container">
            <button className="registform-button">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
