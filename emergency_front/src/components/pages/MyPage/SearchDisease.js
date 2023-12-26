import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MakeSelect = () => { // 선택된 질병 상태
  const [selectedDisease, setSelectedDisease] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [diseaseOptions, setDiseaseOptions] = useState([]); // 질병 옵션 목록 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 한 번만 실행되는 부분
    fetch('http://localhost:8080/disease-api/mypage/selectAll') // 서버 주소 수정
      .then(response => response.json()) // 응답을 JSON 형태로 변환
      .then(data => {
        // 받은 데이터를 Select에서 사용할 형태로 변환
        const options = data.map(diseaseCode => ({
          value: diseaseCode.did,
          label: diseaseCode.dname
        }));
        setDiseaseOptions(options); // 변환된 옵션 목록을 상태에 저장
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []); // 빈 배열을 두 번째 인자로 전달하여 한 번만 실행되도록 함

  const handleDiseaseChange = selectedOption => {
    setSelectedDisease(selectedOption);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleSave = () => {

    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day}`;

    const disease = {
      userId: "ssafy",
      category: "ulDisease",
      value: selectedDisease.label,
      diseaseDate: formattedDate
    };

    fetch('http://localhost:8080/disease-api/mypage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(disease)
    })
      .then(response => response.json())
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
      <p>질병 선택</p>
      <Select
        value={selectedDisease} // 선택된 질병 상태를 값으로 설정
        onChange={handleDiseaseChange} // 선택된 질병을 상태에 저장
        placeholder="질병을 선택하세요."
        options={diseaseOptions} // 질병 옵션 목록을 설정
      />
      <p>날짜 선택</p>
      <DatePicker
        selected={selectedDate} // 선택된 날짜 상태를 값으로 설정
        onChange={handleDateChange} // 선택된 날짜를 상태에 저장
      />
      <button onClick={handleSave}>저장</button>
      {selectedDisease && ( // 선택된 질병이 있을 때만 출력
        <div>
          <p>선택된 질병: {selectedDate.label}</p>
          <p>선택된 날짜: {selectedDate.toLocaleDateString()}</p>
        </div>
      )}
    </>
  );
};

export default MakeSelect;
