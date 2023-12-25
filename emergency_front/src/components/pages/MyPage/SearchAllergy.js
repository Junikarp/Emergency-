import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const MakeSelect = () => {
  const [disease, setDisease] = useState({
    userId: "ssafy",
    category: "allergy",
    value: null,
    diseaseDate: new Date()
  });
  const [diseaseOptions, setDiseaseOptions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/disease-api/mypage/selectAllergy')
      .then(response => response.json())
      .then(data => {
        const options = data.map(allergyName => ({
          value: allergyName.aid,
          label: allergyName.aname
        }));
        setDiseaseOptions(options);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDiseaseChange = selectedDisease => {
    setDisease({ ...disease, value: selectedDisease });
  };

  const handleDateChange = selectedDate => {
    setDisease({ ...disease, diseaseDate: selectedDate });
  };

  const handleSave = () => {
    fetch('http://localhost:8080/disease-api/mypage', {
      method: 'POST',
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
      <p>알레르기 선택</p>
      <Select
        value={disease.value}
        onChange={handleDiseaseChange}
        placeholder="알레르기 원인을 선택하세요."
        options={diseaseOptions}
      />
      <p>날짜 선택</p>
      <DatePicker
        selected={disease.diseaseDate}
        onChange={handleDateChange}
      />
      <button onClick={handleSave}>저장</button>
      {disease.value && (
        <div>
          <p>선택된 알레르기: {disease.value.label}</p>
          <p>선택된 날짜: {disease.diseaseDate.toLocaleDateString()}</p>
        </div>
      )}
    </>
  );
};

export default MakeSelect;
