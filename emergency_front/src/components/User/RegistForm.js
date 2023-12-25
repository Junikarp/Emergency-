// RegisterForm.js
import { useEffect, useState } from "react";

const RegisterForm = ({
  formData,
  pwMsg,
  pwCheckMsg,
  handleChange,
  handleSubmit,
}) => {
  //id 중복인지 확인하는 msg 저장하는 상태
  const [idExistMsg, setIdExistMsg] = useState("");
  //백에서 가져온 id저장
  const [existingIds, setExistingIds] = useState([]);

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
    setIdExistMsg(isExist ? "이미 존재하는 아이디입니다." : "");
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
    <form onSubmit={handleSubmit}>
      <label htmlFor="id">아이디</label>
      <input
        value={formData.id}
        type="text"
        name="id"
        //id바뀌면 다시 확인해야하니까 msg초기화해주기
        onChange={(e) => {
          handleChange(e);
          setIdExistMsg("");
        }}
      />
      {/* 중복검사 버튼 */}
      <button type="button" onClick={handleCheckDuplicate}>
        아이디 확인
      </button>
      <p>{idExistMsg}</p>
      <label htmlFor="name">이름</label>
      <input type="text" name="name" onChange={handleChange} />
      <label htmlFor="password">비밀번호</label>
      <input
        value={formData.password}
        type="password"
        name="password"
        onChange={handleChange}
      />
      <p className="message">{pwMsg}</p>
      <label htmlFor="passwordCheck">비밀번호 확인</label>
      <input
        value={formData.passwordCheck}
        type="password"
        name="passwordCheck"
        onChange={handleChange}
      />
      <p className="message">{pwCheckMsg}</p>
      <label htmlFor="height">신장</label>
      <input type="number" name="height" onChange={handleChange} />
      <label htmlFor="weight">몸무게</label>
      <input type="number" name="weight" onChange={handleChange} />
      <label htmlFor="bloodType">혈액형</label>
      <div className="bloodType-container">
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
      <label htmlFor="guardianTel">보호자 연락처</label>
      <input
        type="tel"
        name="guardianTel"
        pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}"
        onChange={handleChange}
      />
      <button>회원가입 하기</button>
    </form>
  );
};

export default RegisterForm;
