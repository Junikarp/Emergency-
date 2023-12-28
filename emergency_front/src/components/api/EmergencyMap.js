import { useEffect, useState } from "react";
import EmergencyRoom from "./EmergencyRoom";
import FooterNav from "../FooterNav";
// 지도 띄울 거 대비한 현재 위치 갖고오기
function EmergencyMap() {
  const { kakao } = window; // 함수형 컴포넌트에서는 kakao script 인지를 못하므로 window에서 kakao 객체 뽑아서 써야함
  const [location, setLocation] = useState(null);
  const [centerAddr, setCenterAddr] = useState("");
  const [hospitalData, setHospitalData] = useState([]);
  const updateHospitalData = (data) => {
    setHospitalData(data);
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

  useEffect(() => {
    var mapContainer = document.getElementById("map");
    var mapOption = {
      center: location || new kakao.maps.LatLng(37.566826, 126.9786567), // 기본 좌표 설정
      level: 3,
    };

    var map = new kakao.maps.Map(mapContainer, mapOption);
    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          var content =
            '<div class="bAddr">' +
            '<span class="title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            var newCenterAddr = result[i].address_name;
            infoDiv.innerHTML = newCenterAddr;

            // centerAddr 값 업데이트
            setCenterAddr(newCenterAddr);
            break;
          }
        }
      }
    }

    if (Array.isArray(hospitalData) && hospitalData.length > 0) {
      hospitalData.forEach((hospital, index) => {
        const markerPosition = new kakao.map.LatLng(
          hospital.wgs84Lat, // 병원 위도
          hospital.wgs84Lon // 병원 경도
        );

        const marker = new kakao.maps.Marker({
          position: markerPosition,
          map: map,
          title: hospital.dutyName, // 마커에서 툴팁으로 표시될 병원명
        });
        console.log(hospital.wgs84Lat);

        // 마커 클릭했을 떄 이벤트 추가할 수도 있음
        kakao.maps.event.addListener(marker, "click", function () {
          // 병원 정보 활용하여 원하는 작업 수행 가능
          console.log("병원명: ", hospital.dutyName);
        });
      });
    }

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
  }, [location, hospitalData]);

  return (
    <>
      <div
        className="map_wrap"
        style={{
          width: "100%",
          height: "70vh",
        }}
      >
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
          <hr />
          <div className="hAddr">
            <div className="title">지도중심기준 행정동 주소정보</div>
            <div id="centerAddr">{centerAddr}</div>
          </div>
          <hr />
          <div>
            <EmergencyRoom centerAddr={centerAddr} />
          </div>
        </div>
      </div>
    </>
  );
}

export default EmergencyMap;
