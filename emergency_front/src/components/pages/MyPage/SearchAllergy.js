import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import FooterNav from "../../FooterNav";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import './SearchAllergy.css'

const MakeSelect = () => {
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [userInfo, setUserInfo] = useState({ id: "", name: "" }); // 사용자 정보 상태 추가
  const [Allergy, setAllergy] = useState([]);
  const navigate = useNavigate();

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

          // Fetch allergy data
          const allergyResponse = await fetch('http://localhost:8080/disease-api/mypage/selectAllergy');
          if (allergyResponse.ok) {
            const allergyData = await allergyResponse.json();
            const options = allergyData.map(allergyName => ({
              value: allergyName.aid,
              label: allergyName.aname
            }));
            setDiseaseOptions(options);
          } else {
            console.error('Error fetching allergy data:', allergyResponse.statusText);
          }


          // Fetch user's allergy info
          const userAllergyResponse = await fetch(`http://localhost:8080/disease-api/mypage/${decodedId}/allergy`);
          if (userAllergyResponse.ok) {
            const userAllergyData = await userAllergyResponse.json();
            setAllergy(userAllergyData);
          } else {
            console.error('Error fetching user allergy data:', userAllergyResponse.statusText);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };


    fetchData();
  }, []);



  const handleDiseaseChange = selectedOption => {
    setSelectedDisease(selectedOption);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleSave = async () => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const disease = {
      userId: userInfo.id,
      category: "allergy",
      value: selectedDisease.label,
      diseaseDate: formattedDate
    };

    try {
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
        <div id="input-box">
          <div>
            <p>알레르기 선택</p>
            <Select id="select"
              value={selectedDisease}
              onChange={handleDiseaseChange}
              placeholder="알레르기 원인을 선택하세요."
              options={diseaseOptions}
            />
          </div>
          <div>
            <p>날짜 선택</p>
            <DatePicker id="picker"
              selected={selectedDate}
              onChange={handleDateChange}
            />
            <button className="save" onClick={handleSave}>저장</button>
          </div>
        </div>
        <div>
          <ul>
        {/* Disease 배열을 순회하며 목록을 출력합니다. */}
        {Allergy.map((item, index) => (
          <li key={index}>{item.value} {item.diseaseDate}</li>
        ))}
      </ul>
        </div>
      </div>
      <div className="foot">
        <FooterNav />
      </div>
    </>
  );
};

export default MakeSelect;
