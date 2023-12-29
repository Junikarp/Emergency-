import React, { useEffect, useState } from "react";
import { xmlToJson } from "./util";
import { parseAdd } from "./util";
import TestMap from "./TestMap";
// 응급실 데이터 받아오고 출력함 (emergencyMap에서 centerAddr 가져옴)
function EmergencyRoom({ centerAddr }) {
  const parsedAddress = parseAdd(centerAddr);
  // parsedAddress가 정의되었는지 확인 후 매핑
  // console.log(parsedAddress);
  // console.log(centerAddr);

  const [hospitalData, setHospitalData] = useState([]);
  const [hospitalMsgData, setHospitalMsgData] = useState([]);
  function processData(data) {
    return data;
  }
  function formatUpdateTime(hvidate) {
    const year = hvidate.slice(0, 4);
    const month = hvidate.slice(4, 6);
    const day = hvidate.slice(6, 8);
    const hour = hvidate.slice(8, 10);
    const minute = hvidate.slice(10, 12);
    const second = hvidate.slice(12, 14);

    return `${year}-${month}-${day}(${hour}:${minute}:${second})`;
  }

  useEffect(() => {
    const getXMLfromAPI = async () => {
      try {
        // 위치 받아온 후에 apiUrl 생성
        const BASE_URL =
          "https://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmRltmUsefulSckbdInfoInqire";
        const BASE_ADDR_URL =
          "http://apis.data.go.kr/B552657/ErmctInfoInqireService/getEmrrmSrsillDissMsgInqire";
        const { SiDo, SiGunGu } = parseAdd(centerAddr);
        const encodedSiDo = encodeURIComponent(SiDo);
        const encodedSiGunGu = encodeURIComponent(SiGunGu);
        const E_KEY =
          "ykFoRIg764raDV3z%2FboRSWMVbD%2FV3uV6ER3eaRTLsnQWkqTFXp%2BzLI2jAoaC8nUJG3iHIDthLfrAAAqcgCc1Cg%3D%3D";
        const apiUrl = `${BASE_URL}?serviceKey=${E_KEY}&STAGE1=${encodedSiDo}&STAGE2=${encodedSiGunGu}&pageNo=1&numOfRows=10`;
        const apiAddrUrl = `${BASE_ADDR_URL}?serviceKey=${E_KEY}&Q0=${encodedSiDo}&Q1=${encodedSiGunGu}&pageNo=1&numOfRows=10`;
        // apiUrl을 이용해서 데이터 요청
        // console.log(apiAddrUrl);
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
        // -----------------------------------------------
        const response_msg = await fetch(apiAddrUrl);
        const xmlStringMsg = await response_msg.text();
        const XmlNode_msg = new DOMParser().parseFromString(
          xmlStringMsg,
          "text/xml"
        );
        const {
          response: {
            body: {
              items: { item: itemMSG },
            },
          },
        } = xmlToJson(XmlNode_msg);
        const processedMsgData = processData(itemMSG);
        // setHospitalMsgData((prevHospitalMsgData) => {
        //   console.log("이전 병원 메시지 데이터:", prevHospitalMsgData);
        //   console.log("업데이트된 병원 메시지 데이터:", processedMsgData);
        //   return processedMsgData;
        // });
        setHospitalMsgData(processedMsgData);
      } catch (error) {
        console.log(error);
      }
    };

    getXMLfromAPI();
  }, [centerAddr]); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      {Array.isArray(hospitalData)
        ? hospitalData.map((hospital, index) => (
            <div key={index}>
              <p>업데이트 시간: {formatUpdateTime(hospitalData.hvidate)}</p>
              <p>병원명: {hospital.dutyName}</p>
              <p>병원 전화번호: {hospital.dutyTel3}</p>
              <p>현재 가용가능 응급실 수: {hospital.hvec}</p>
              <hr />
              {hospitalMsgData
                .filter((msgItem) => msgItem.dutyAddr === hospital.dutyAddr)
                .map((msgItem) => (
                  <div key={msgItem.rnum}>
                    <p>응급실 주소: {msgItem.dutyAddr}</p>
                    <p>응급실 메시지: {msgItem.symBlkMsg}</p>
                  </div>
                ))}
            </div>
          ))
        : hospitalData && (
            <div>
              <p>업데이트 시간: {formatUpdateTime(hospitalData.hvidate)}</p>
              <p>병원명: {hospitalData.dutyName}</p>
              <p>병원 전화번호: {hospitalData.dutyTel3}</p>
              <p>현재 가용가능 응급실 수: {hospitalData.hvec}</p>
              <hr />
              {Array.isArray(hospitalMsgData) &&
                hospitalMsgData.reduce((uniqueAddresses, msgItem) => {
                  if (!uniqueAddresses.includes(msgItem.dutyAddr)) {
                    uniqueAddresses.push(msgItem.dutyAddr);

                    const messagesForAddress = hospitalMsgData
                      .filter((item) => item.dutyAddr === msgItem.dutyAddr)
                      .map((item) => (
                        <div key={item.rnum}>
                          <p>응급실 주소: {item.dutyAddr}</p>
                          <p>응급실 메시지: {item.symBlkMsg}</p>
                        </div>
                      ));

                    return [...uniqueAddresses, ...messagesForAddress];
                  }
                  return uniqueAddresses;
                }, [])}

              <div>
                {/* <p>응급실 주소 : {hospitalMsgData.dutyAddr}</p>
                <p>응급실 메시지 : {hospitalMsgData.symBlkMsg}</p> */}
              </div>
            </div>
          )}
      <TestMap
        handleHospitalData={hospitalData}
        handleHospitalAddrData={hospitalMsgData}
      />
    </>
  );
  // hospitalData를 사용하여 렌더링하는 로직 추가
}

// hospitalData를
export default EmergencyRoom;
