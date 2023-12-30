import FooterNav from "../../FooterNav";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyPageContainer from "./MyPageContainer";
import Login from "../../User/Login";
import allergyImg from "../../../assets/allergy.png";
import medicationImg from "../../../assets/medication.png";
import virusImg from "../../../assets/virus.png";
import myinfoImg from "../../../assets/myinfo.png";
import "../MyPage/MyPage.css";
import { jwtDecode } from "jwt-decode";

const MyPage = ({ token }) => {
  const [userInfo, setUserInfo] = useState({ id: "", name: "" });
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();
  //로그인 됐는지 토큰 가져와서 상태 확인
  useEffect(() => {
    const existToken = localStorage.getItem("token");
    //토큰 있으면 로그인 ㅅ아태
    setIsLogin(existToken);
    const fetchData = async () => {
      try {
        if (existToken) {
          const userToken = jwtDecode(existToken);
          const decodedId = userToken.id;
          setUserInfo({ id: decodedId });

          const response = await fetch(
            `http://localhost:8080/api/user/${decodedId}`
          );
          if (response.ok) {
            const userData = await response.json();
            setUserInfo((prevState) => ({
              ...prevState,
              name: userData.name,
            }));
          } else {
            console.error("에러", response.statusText);
          }
        }
      } catch (error) {
        console.error("에러", error);
      }
    };

    fetchData();
  }, []);
  //로그아웃
  const handleLogout = () => {
    //로그아웃 누르면 토큰 삭제
    localStorage.removeItem("token");
    //홈으로 이동
    navigate("/");
    setIsLogin(false);
    const handleLogout = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/logout`, {
          method: "GET",
          credentials: "same-origin",
        });
        if (response.ok) {
          //로그아웃 누르면 토큰 삭제
          localStorage.removeItem("token");
          setIsLogin(false);
          // //홈으로 이동
          navigate("/");
        } else {
          console.error("로그아웃 실패");
        }
      } catch (error) {
        console.error("에러남", error);
      }
    };
  };
  const imgStyle = {
    width: "72px",
    height: "72px",
    float: "left",
  };

  return (
    <>
      {token !== null ? (
        <>
          <div id="mypage-main">
            <header className="mypage-header">
              <h2>마이페이지</h2>
            </header>
            <div className="mypage-mypagecontainer-global">
              <div id="mypage-name-box">
                <h2>{userInfo.name} 님</h2>
              </div>
              <div id="mypage-button-box">
                <MyPageContainer>
                  <div id="mypage-small-button-box">
                    <Link to="/mypage/mypagedetail">
                      <div className="mypage-button">
                        <div className="mypage-button-img">
                          <img src={myinfoImg} style={imgStyle} />
                        </div>
                        <div className="mypage-button-text">
                          <p id="mypage-button-text">마이페이지</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/mypage/disease">
                      <div className="mypage-button">
                        <div className="mypage-button-img">
                          <img src={virusImg} style={imgStyle} />
                        </div>
                        <div className="mypage-button-text">
                          <p id="mypage-button-text">내 질환</p>
                        </div>
                      </div>
                    </Link>
                  </div>
                  <div id="mypage-small-button-box">
                    <Link to="/mypage/takingmedicine">
                      <div className="mypage-button">
                        <div className="mypage-button-img">
                          <img src={medicationImg} style={imgStyle} />
                        </div>
                        <div className="mypage-button-text">
                          <p id="mypage-button-text">내 복용약</p>
                        </div>
                      </div>
                    </Link>
                    <Link to="/mypage/allergy">
                      <div className="mypage-button">
                        <div className="mypage-button-img">
                          <img src={allergyImg} style={imgStyle} />
                        </div>
                        <div className="mypage-button-text">
                          <p id="mypage-button-text">내 알레르기</p>
                        </div>
                      </div>
<<<<<<< HEAD
                    </Link>
                  </div>
                </MyPageContainer>
                {isLogin ? (
                  // 로그인 상태일 때 로그아웃 버튼 렌더링
                  <button onClick={handleLogout} id="login">
                    로그아웃
                  </button>
                ) : (
                  // 로그인 상태가 아닐 때 로그인 버튼 렌더링
                  <>
                    <Link to="/login">
                      <button id="login">로그인</button>
                    </Link>
                    <Link to="/register">
                      <button id="login">회원가입</button>
                    </Link>
                  </>
                )}
              </div>
=======
                    </div>
                  </Link>
                </div>
                <div id="mypage-small-button-box">
                  <Link to="/mypage/takingmedicine">
                    <div className="mypage-button">
                      <div className="mypage-button-img">
                        <img src={medicationImg} style={imgStyle} />
                      </div>
                      <div className="mypage-button-text">
                        <p id="mypage-button-text">내 복용약</p>
                      </div>
                    </div>
                  </Link>
                  <Link to="/mypage/allergy">
                    <div className="mypage-button">
                      <div className="mypage-button-img">
                        <img src={allergyImg} style={imgStyle} />
                      </div>
                      <div className="mypage-button-text">
                        <p id="mypage-button-text">내 알레르기</p>
                      </div>
                    </div>
                  </Link>
                </div>
              </MyPageContainer>
              {isLogin ? (
                // 로그인 상태일 때 로그아웃 버튼 렌더링
                <button
                  onClick={handleLogout}
                  id="login"
                  className="btn-mypage"
                >
                  로그아웃
                </button>
              ) : (
                // 로그인 상태가 아닐 때 로그인 버튼 렌더링
                <>
                  <Link to="/login">
                    <button id="login" className="btn-mypage">
                      로그인
                    </button>
                  </Link>
                  <Link to="/register">
                    <button id="login" className="btn-mypage">
                      회원가입
                    </button>
                  </Link>
                </>
              )}
>>>>>>> 2ce08a5c7d6e695bd970f681082837b41744046d
            </div>
          </div>
          <FooterNav />
        </>
      ) : (
        <Login />
      )}
    </>
  );
};

export default MyPage;
