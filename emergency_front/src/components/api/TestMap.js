import { useEffect, useState } from "react";

function TestMap({ handleHospitalData, handleHospitalAddrData }) {
  const { kakao } = window; // 함수형 컴포넌트에서는 kakao script 인지를 못하므로 window에서 kakao 객체 뽑아서 써야함
  const [location, setLocation] = useState(null);
  const [centerAddr, setCenterAddr] = useState("");
  const [hospitalData, setHospitalData] = useState([]);
  const [positions, setPositions] = useState([]);
  // 주소로 좌표변환하기
  const getAddressCoords = async (address) => {
    return new Promise((resolve, reject) => {
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const coords = {
            latitude: result[0].y,
            longitude: result[0].x,
          };
          resolve(coords);
        } else {
          reject(status);
        }
      });
    });
  };

  useEffect(() => {
    const successHandler = (response) => {
      const { latitude, longitude } = response.coords;
      const newLocation = new kakao.maps.LatLng(latitude, longitude);
      setLocation(newLocation); // 현재 위치로 잡아줘잉
    };

    const errorHandler = (error) => {
      console.log(error);
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler);
  }, []); // useEffect에 빈 의존성 배열을 전달하여 한 번만 실행되도록 설정

  //   useEffect(() => {
  //     // handleHospitalMsgData가 변경될 때마다 좌표 얻기
  //     console.log(handleHospitalAddrData);

  //     const updateMapMarkers = async () => {
  //       if (Array.isArray(handleHospitalAddrData)) {
  //         const newPositions = await Promise.all(
  //           handleHospitalAddrData.map(async (msgItem) => {
  //             const address = msgItem.dutyAddr;
  //             const coords = await getAddressCoords(address);
  //             // coords를 이용하여 원하는 작업 수행
  //             const content = `<div>${msgItem.dutyName}</div><div>${msgItem.symBlkMsg}</div>`;
  //             return {
  //               content,
  //               latlng: new kakao.maps.LatLng(coords.latitude, coords.longitude),
  //             };
  //           })
  //         );
  //         setPositions(newPositions);
  //         console.log(newPositions);
  //       } // 특정 주소의 좌표를 얻는 함수
  //     };
  //     updateMapMarkers();
  //   }, [handleHospitalAddrData]);

  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: location || new kakao.maps.LatLng(37.566826, 126.9786567), // 기본 좌표 설정
      level: 6,
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    /// 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 마커랑 인포윈도우 담을 배열
    const markers = [];

    const updateMapMarkers = async () => {
      if (Array.isArray(handleHospitalAddrData)) {
        const newPositions = await Promise.all(
          handleHospitalAddrData.map(async (msgItem) => {
            const address = msgItem.dutyAddr;
            const coords = await getAddressCoords(address);
            // handleHospitalData랑 handleHospitalAddrData랑 같은 dutyName인 병원 찾기
            let hasHvec = "";
            if (Array.isArray(handleHospitalData)) {
              const findHospital = handleHospitalData.find(
                (hospital) => hospital.dutyName === msgItem.dutyName
              );
              // 해당하는 항목 있으면 hvec 가져와잇
              hasHvec = findHospital
                ? `<div><h2>${findHospital.dutyName}</h2><div><h3>${findHospital.hvec}</h3></div>`
                : `<div>"에러떠 수고"</div>`;
            } else {
              hasHvec = `<div><h2>병원명: ${handleHospitalData.dutyName}</h2><div><h3>현재 가용가능 응급실 수:${handleHospitalData.hvec}</h3></div>`;
            }
            const content = `<div><div>${hasHvec}</div><div>${msgItem.symBlkMsg}</div></div>`;

            // 마커 생성하고 지도에 표시
            const marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(
                coords.latitude,
                coords.longitude
              ),
            });

            // 마커에 이벤트 리스너 등록
            kakao.maps.event.addListener(
              marker,
              "mouseover",
              makeOverListener(map, marker, content)
            );
            kakao.maps.event.addListener(
              marker,
              "mouseout",
              makeOutListener(map, marker)
            );
            // 인포 윈도우 담을 변수
            const infowindow = new kakao.maps.InfoWindow({
              content: content,
            });

            // 마커를 배열에 추가
            markers.push({ marker, infowindow });

            return {
              content,
              latlng: new kakao.maps.LatLng(coords.latitude, coords.longitude),
            };
          })
        );
        setPositions(newPositions);
        console.log(newPositions);
      }
    };

    // var callback = function (result, status) {
    //   if (status === kakao.maps.services.Status.OK) {
    //     console.log(result);
    //   } else {
    //     console.error("Failed to convert address to coordinates:", status);
    //   }
    // };

    // // 주소를 좌표로 변환하는 함수를 호출합니다
    // geocoder.addressSearch("대전광역시 유성구 북유성대로 93(지족동)", callback);

    // // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
    // positions.forEach((position) => {
    //   var marker = new kakao.maps.Marker({
    //     map: map,
    //     position: position.latlng,
    //   });

    //   var infowindow = new kakao.maps.InfoWindow({
    //     content: position.content,
    //   });
    //   // 마커에 mouseover 이벤트와 mouseout 이벤트를 등록합니다
    //   // 이벤트 리스너로는 클로저를 만들어 등록합니다
    //   // for문에서 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
    //   kakao.maps.event.addListener(
    //     marker,
    //     "mouseover",
    //     makeOverListener(map, marker, infowindow)
    //   );
    //   kakao.maps.event.addListener(
    //     marker,
    //     "mouseout",
    //     makeOutListener(infowindow)
    //   );
    // });

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        // 마커에 마우스 오버 시 인포윈도우 표시
        for (let i = 0; i < markers.length; i++) {
          if (marker === markers[i].marker) {
            markers[i].infowindow.open(map, marker);
          } else {
            markers[i].infowindow.close();
          }
        }
      };
    }

    const makeOutListener = (map, marker) => {
      return function () {
        // 마커에서 마우스 나가면 인포윈도우 닫기
        for (let i = 0; i < markers.length; i++) {
          markers[i].infowindow.close();
        }
      };
    };

    // 이전 마커들을 지도에서 제거
    markers.forEach((m) => {
      m.marker.setMap(null);
    });

    // 새로운 마커들을 업데이트
    updateMapMarkers();

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    var mapTypeControl = new kakao.maps.MapTypeControl();

    // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    var zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

    if (location) {
      console.log(location);
    }

    console.log(centerAddr);
  }, [
    handleHospitalData,
    hospitalData,
    location,
    centerAddr,
    handleHospitalAddrData,
  ]);

  return (
    <div className="map_wrap">
      <div
        id="map"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      ></div>
      <div id="menu_wrap" className="bg_white">
        <div className="option">
          <div></div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default TestMap;
