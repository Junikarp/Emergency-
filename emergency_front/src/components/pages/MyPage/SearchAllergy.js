import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MakeSelect = () => {
  const [selectedDisease, setSelectedDisease] = useState(null); // 선택된 알레르기 상태
  const [selectedDate, setSelectedDate] = useState(new Date()); // 선택된 날짜 상태
  const [diseaseOptions, setDiseaseOptions] = useState([]); // 알레르기 옵션 목록 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되는 부분
    fetch('http://localhost:8080/disease-api/mypage/selectAllergy')
      .then(response => response.json()) // 응답을 JSON 형태로 변환
      .then(data => {
        // 받은 데이터를 Select에서 사용할 형태로 변환
        const options = data.map(allergyName => ({
          value: allergyName.aid,
          label: allergyName.aname
        }));
        setDiseaseOptions(options); // 변환된 옵션 목록을 상태에 저장
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // 빈 배열을 두 번째 인자로 전달하여 한 번만 실행되도록 함

  const handleDiseaseChange = selectedOption => {
    setSelectedDisease(selectedOption); // 선택된 알레르기를 상태에 저장
  };

  const handleDateChange = date => {
    setSelectedDate(date); // 선택된 날짜를 상태에 저장
  };

  const handleSave = () => {

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더하고 두 자리로 표시
    const day = String(selectedDate.getDate()).padStart(2, '0'); // 일은 두 자리로 표시

    const formattedDate = `${year}-${month}-${day}`;

    // 서버로 데이터 전송하는 로직
    const disease = {
      userId: "ssafy",
      category: "allergy",
      value: selectedDisease.label,
      diseaseDate: formattedDate
    };
    fetch('http://localhost:8080/disease-api/mypage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(disease)
    })
      .then(response => response.json()
      )
      .then(data => {
        // 서버로부터의 응답 처리
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <>
      <p>알레르기 선택</p>
      <Select
        value={selectedDisease} // 선택된 알레르기 상태를 값으로 설정
        onChange={handleDiseaseChange} // 선택된 알레르기를 상태에 저장하는 함수
        placeholder="알레르기 원인을 선택하세요."
        options={diseaseOptions} // 알레르기 옵션 목록을 설정
      />
      <p>날짜 선택</p>
      <DatePicker
        selected={selectedDate} // 선택된 날짜 상태를 값으로 설정
        onChange={handleDateChange} // 선택된 날짜를 상태에 저장하는 함수
      />
      <button onClick={handleSave}>저장</button>
      {selectedDisease && ( // 선택된 알레르기가 있을 때만 출력
        <div>
          <p>선택된 알레르기: {selectedDisease.label}</p>
          <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
        </div>
      )}
    </>
  );
};

export default MakeSelect;
