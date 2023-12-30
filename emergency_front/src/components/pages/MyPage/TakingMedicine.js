import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import FooterNav from "../../FooterNav";
import { jwtDecode } from "jwt-decode";
import allergyImg from "../../../assets/allergy.png"
import deleteImg from "../../../assets/deleteAllergy.png"
import 'react-datepicker/dist/react-datepicker.css';
import './TakingMedicine.css'

const TakingMedicine = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [userInfo, setUserInfo] = useState({ id: "", name: "" });
  const [Medication, setMedication] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const existToken = localStorage.getItem("token");
        if (existToken) {
          const userToken = jwtDecode(existToken);
          const decodedId = userToken.id;
          setUserInfo({ id: decodedId }); // ID 설정

          // Fetch user name from backend API
          const response = await fetch(`http://localhost:8080/api/user/${decodedId}`);
          if (response.ok) {
            const userData = await response.json();
            setUserInfo(prevState => ({ ...prevState, name: userData.name })); // 이름 설정
          } else {
            console.error('Error fetching user data:', response.statusText);
          }

          // Fetch user's allergy info
          const userMedicationResponse = await fetch(`http://localhost:8080/disease-api/mypage/${decodedId}/medication`);
          if (userMedicationResponse.ok) {
            const userAllergyData = await userMedicationResponse.json();
            setMedication(userAllergyData);
          } else {
            console.error('Error fetching user allergy data:', userMedicationResponse.statusText);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  // 옵션 선택
  const handleDiseaseChange = selectedOption => {
    setSelectedDisease(selectedOption);
  };

  // 날씨 선택
  const handleDateChange = date => {
    setSelectedDate(date);
  };

  // 삭제 관련
  const handleDelete = async (diseaseId) => {
    try {
      const response = await fetch(`http://localhost:8080/disease-api/mypage/${diseaseId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // 요청이 성공하면 deleted 상태를 업데이트합니다.
        console.log('Delete successful');
        window.location.reload();
      } else {
        console.error('Delete request failed');
      }
    } catch (error) {
      console.error('Error deleting disease:', error);
    }
  };

  // 날씨포맷, 저장관련
  const handleSave = async () => {
    if (!selectedDisease) {
      // 약물을 선택하지 않은 경우 처리
      alert("약명을 입력해주세요.");
      console.error('약명을 입력해주세요.');
      return;
    }
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const disease = {
      userId: userInfo.id,
      category: "medication",
      value: selectedDisease,
      diseaseDate: formattedDate
    };

    try {
      // 새로 등록
      const response = await fetch('http://localhost:8080/disease-api/mypage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(disease)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Save successful:', data);
        window.location.reload();
        alert("등록 완료!");
      } else {
        console.error('Save failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  if (!userInfo.id) {
    return <div>Loading...</div>; // 유저 정보가 없으면 로딩 중을 표시합니다.
  }



  return (
    <>
      <div id="name-box">
        {userInfo.name} 님 {/* 이름과 ID를 표시합니다. */}
      </div>
      <div id="main-con">
        <div id="medication-title">
          <img src={allergyImg} id="allergyImg"></img>
          <p>복용약</p>
        </div>
        <div id="input-box">
          <div>
            <p>복용약 입력</p>
            <input
              type="text"
              id="medication-select"
              placeholder="복용하고 있는 약의 이름을 적으세요."
              value={selectedDisease}
              onChange={(e) => setSelectedDisease(e.target.value)}
            />
          </div>
          <div id="picker-button">
            <p>날짜 선택</p>
            <DatePicker id="picker"
              selected={selectedDate}
              onChange={handleDateChange}
            />
            <button className="save" onClick={handleSave}>저장</button>
          </div>
        </div>
        <div>
          <table id="medication-table">
            <thead>
              <tr>
                <th className="medication-cause">복용 중인 약</th>
                <th>처방 일자</th>
              </tr>
            </thead>
            <tbody>
              {/* Disease 배열을 순회하며 테이블 행을 출력합니다. */}
              {Medication.map((item, index) => (
                <tr key={index}>
                  <td>{item.value}</td>
                  <td>{item.diseaseDate}</td>
                  <img src={deleteImg} id="deleteImg" onClick={() => handleDelete(item.diseaseId)} style={{ cursor: 'pointer' }} />
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="foot">
        <FooterNav />
      </div>
    </>
  );
};

export default TakingMedicine;
