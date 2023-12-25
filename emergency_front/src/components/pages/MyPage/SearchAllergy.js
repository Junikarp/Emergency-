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
    fetch('http://localhost:8080/disease-api/mypage/selectAllergy') // 서버 주소 수정
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

  return (
    <>
      <p>알레르기 선택</p>
      <Select
        value={selectedDisease} // 선택된 질병 상태를 값으로 설정
        onChange={(selectedOption) => setSelectedDisease(selectedOption)} // 선택된 질병을 상태에 저장
        placeholder="알레르기 원인을 선택하세요."
        options={diseaseOptions} // 질병 옵션 목록을 설정
      />
      <p>날짜 선택</p>
      <DatePicker
        selected={selectedDate} // 선택된 날짜 상태를 값으로 설정
        onChange={(date) => setSelectedDate(date)} // 선택된 날짜를 상태에 저장
      />
      {selectedDisease && ( // 선택된 질병이 있을 때만 출력
        <div>
          <p>선택된 알레르기: {selectedDisease.label}</p>
          <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
        </div>
      )}
    </>
  );
};

export default MakeSelect;
