// Register.js
import React, { useState } from "react";
import RegisterForm from "./RegistForm";
import { useNavigate } from "react-router-dom";
import FooterNav from "../FooterNav";

const Register = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    password: "",
    passwordCheck: "",
    height: 0,
    weight: 0,
    bloodtypeRh: "Rh+",
    bloodtypeABO: "A",
    guardianTel: "",
  });

  //유효한 상태인지 문구 띄우기
  const [pwMsg, setPwMsg] = useState("");
  const [pwCheckMsg, setPwCheckMsg] = useState("");
  const navigate = useNavigate();

  const validatePw = (password) => {
    console.log(password);
    return password
      .toLowerCase()
      .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/);
    // setPassword(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 비밀번호 유효 검사
    if (name === "password") {
      setFormData((prevData) => ({ ...prevData, [name]: value }));

      if (!validatePw(value)) {
        setPwMsg("영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요");
      } else {
        setPwMsg("");
      }
    } else if (name === "passwordCheck") {
      // 비밀번호 확인 일치 여부 검사
      setFormData((prevData) => ({ ...prevData, [name]: value }));

      const isPasswordMatch = value === formData.password;
      setPwCheckMsg(isPasswordMatch ? "" : "비밀번호가 일치하지 않습니다.");
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.id ||
      !formData.name ||
      !formData.password ||
      !formData.passwordCheck ||
      !formData.height ||
      !formData.weight ||
      !formData.bloodtypeRh ||
      !formData.bloodtypeABO ||
      !formData.guardianTel
    ) {
      alert("모든 필수 항목을 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        //회원가입 성공
        console.log("회원가입 성공");
        alert(`${formData.name}님 환영합니다`);
        navigate("/");
        setFormData({
          id: "",
          name: "",
          password: "",
          passwordCheck: "",
          height: 0,
          weight: 0,
          bloodtypeRh: "Rh+",
          bloodtypeABO: "A",
          guardianTel: "",
        });
      } else {
        //실패
        console.error("가입 실패");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <RegisterForm
          formData={formData}
          pwMsg={pwMsg}
          pwCheckMsg={pwCheckMsg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
      <div>
        <FooterNav />
      </div>
    </div>
  );
};

export default Register;
