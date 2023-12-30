import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import FooterNav from "../../FooterNav";
import { jwtDecode } from "jwt-decode";
import diseaseImg from "../../../assets/allergy.png";
import deleteImg from "../../../assets/deleteAllergy.png";
import "react-datepicker/dist/react-datepicker.css";
import "./SearchDisease.css";

const MakeSelect = () => {
  // 선택된 질병 상태
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseaseOptions, setDiseaseOptions] = useState([]); // 질병 옵션 목록 상태
  const [userInfo, setUserInfo] = useState({ id: "", name: "" });
  const [Disease, setDisease] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const existToken = localStorage.getItem("token");
        if (existToken) {
          const userToken = jwtDecode(existToken);
          const decodedId = userToken.id;
          setUserInfo({ id: decodedId }); // ID 설정

          // Fetch user name from backend API
          const response = await fetch(
            `http://localhost:8080/api/user/${decodedId}`
          );
          if (response.ok) {
            const userData = await response.json();
            setUserInfo((prevState) => ({ ...prevState, name: userData.name })); // 이름 설정
          } else {
            console.error("Error fetching user data:", response.statusText);
          }

          // Retcg disease data
          const diseaseResponse = await fetch(
            "http://localhost:8080/disease-api/mypage/selectAll"
          );
          if (diseaseResponse.ok) {
            const diseaseData = await diseaseResponse.json();
            const options = diseaseData.map((diseaseCode) => ({
              // 받은 데이터를 Select에서 사용할 형태로 변환
              value: diseaseCode.did,
              label: diseaseCode.dname,
            }));
            setDiseaseOptions(options); // 변환된 옵션 목록을 상태에 저장
          } else {
            console.error(
              "Error fetching disease data:",
              diseaseResponse.statusText
            );
          }

          const userDiseaseResponse = await fetch(
            `http://localhost:8080/disease-api/mypage/${decodedId}/ulDisease`
          );
          if (userDiseaseResponse.ok) {
            const userDiseaseData = await userDiseaseResponse.json();
            setDisease(userDiseaseData);
          } else {
            console.error(
              "Error fetching user disease data:",
              userDiseaseResponse.statusText
            );
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  const handleDiseaseChange = (selectedOption) => {
    setSelectedDisease(selectedOption);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleDelete = async (diseaseId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/disease-api/mypage/${diseaseId}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        // 요청이 성공하면 deleted 상태를 업데이트합니다.
        console.log("Delete successful");
        window.location.reload();
      } else {
        console.error("Delete request failed");
      }
    } catch (error) {
      console.error("Error deleting disease:", error);
    }
  };

  const handleSave = async () => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
    const day = String(selectedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    const disease = {
      userId: userInfo.id,
      category: "ulDisease",
      value: selectedDisease.label,
      diseaseDate: formattedDate,
    };

    try {
      const response = await fetch("http://localhost:8080/disease-api/mypage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(disease),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Save successful:", data);
        window.location.reload();
        alert("등록 완료!");
      } else {
        console.error("Save failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  if (!userInfo.id) {
    return <div>Loading...</div>; // 유저 정보가 없으면 로딩 중을 표시합니다.
  }

  return (
    <>
      <div id="disease-whole">
        <div id="name-box">
          {userInfo.name} 님 {/* 이름과 ID를 표시합니다. */}
        </div>
        <div id="main-con">
          <div id="disease-title">
            <img src={diseaseImg} id="diseaseImg"></img>
            <p>내 질환</p>
          </div>
          <div id="input-box">
            <div>
              <p>질환 선택</p>
              <Select
                id="select"
                value={selectedDisease}
                onChange={handleDiseaseChange}
                placeholder="질병을 선택하세요."
                options={diseaseOptions}
              />
            </div>
            <div id="picker-button">
              <p>날짜 선택</p>
              <DatePicker
                id="picker"
                selected={selectedDate}
                onChange={handleDateChange}
              />
              <button className="save" onClick={handleSave}>
                저장
              </button>
            </div>
          </div>
          <div>
            <table id="disease-table">
              <thead>
                <tr>
                  <th className="disease-cause">진단 받은 병명</th>
                  <th>진단 일자</th>
                </tr>
              </thead>
              <tbody>
                {/* Disease 배열을 순회하며 테이블 행을 출력합니다. */}
                {Disease.map((item, index) => (
                  <tr key={index}>
                    <td>{item.value}</td>
                    <td>{item.diseaseDate}</td>
                    <img
                      src={deleteImg}
                      id="deleteImg"
                      onClick={() => handleDelete(item.diseaseId)}
                      style={{ cursor: "pointer" }}
                    />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="foot">
        <FooterNav />
      </div>
    </>
  );
};

export default MakeSelect;
