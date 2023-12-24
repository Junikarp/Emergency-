import React, { useEffect, useState } from "react";
import xmlToJson from "./xmlToJson";

function EmergencyRoom() {
  const BASE_URL =
    "https://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire";
  const SiDo = encodeURIComponent("대전광역시");
  const SiGunGu = encodeURIComponent("중구");
  const E_KEY =
    "ykFoRIg764raDV3z%2FboRSWMVbD%2FV3uV6ER3eaRTLsnQWkqTFXp%2BzLI2jAoaC8nUJG3iHIDthLfrAAAqcgCc1Cg%3D%3D";
  const apiUrl = `${BASE_URL}?serviceKey=${E_KEY}&STAGE1=${SiDo}&STAGE2=${SiGunGu}&pageNo=1&numOfRows=10`;
  const [hospitalData, setHospitalData] = useState([]);

  const processData = (data) => {
    return data;
  };

  useEffect(() => {
    const getXMLfromAPI = async () => {
      try {
        const response = await fetch(apiUrl);
        const xmlString = await response.text(); // 해석할 xml문자열.
        const XmlNode = new DOMParser().parseFromString(xmlString, "text/xml"); // xml로 변형

        // import해온 xmlToJson함수 안에 변형한 XmlNode를 넣어준다. 그러면 json객체를 return해준다.
        const {
          response: {
            body: {
              items: { item },
            },
          },
        } = xmlToJson(XmlNode); // 구조분해할당 으로 data를 변수에 저장해줌.
        // 데이터를 적절히 처리한 후 setHospitalData에 전달
        const processedData = processData(item);
        setHospitalData(processedData);
      } catch (error) {
        console.log(error);
      }
    };

    getXMLfromAPI();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      {hospitalData.map((hospital, index) => (
        <div key={index}>
          <p>병원명: {hospital.dutyName}</p>
          <p>병원 전화번호: {hospital.dutyTel3}</p>
          <p>현재 가용가능 응급실 수: {hospital.hvec}</p>
          {/* 다른 필요한 정보들을 추가로 표시할 수 있습니다. */}
        </div>
      ))}
    </>
  );
  // hospitalData를 사용하여 렌더링하는 로직 추가
}
export default EmergencyRoom;
