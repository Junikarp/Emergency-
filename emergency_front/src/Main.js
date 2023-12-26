// Main.js
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import MyPage from "./components/pages/MyPage/MyPage";
import Home from "./components/pages/Home";
import ChatBot from "./components/pages/ChatBot/ChatBot";
import FirstAid from "./components/pages/FirstAid/FirstAid";
import TakingMedicine from "./components/pages/MyPage/TakingMedicine";
import DiagnosisHX from "./components/pages/MyPage/DiagnosisHX";
import MyPageDetail from "./components/pages/MyPage/MyPageDetail";
import Login from "./components/User/Login";
import SearchDisease from "../src/components/pages/MyPage/SearchDisease";
import SearchAllergy from "../src/components/pages/MyPage/SearchAllergy";
import Register from "./components/User/Register";
import MyPageDetailUpdate from "./components/pages/MyPage/MyPageDetailUpdate";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="firstaid" element={<FirstAid />} />
        <Route path="mypage">
          {/* 자꾸 홈에서 mypage로 갈 때 token이 undefined가 떠서 token바로 전달해주기 */}
          <Route
            index
            element={<MyPage token={localStorage.getItem("token")} />}
          />
          <Route path="mypagedetail">
            <Route index element={<MyPageDetail />} />
            <Route path="update" element={<MyPageDetailUpdate />} />
          </Route>
          <Route path="disease" element={<SearchDisease />} />
          <Route path="diagnosishx" element={<DiagnosisHX />} />
          <Route path="takingmedicine" element={<TakingMedicine />} />
          <Route path="allergy" element={<SearchAllergy />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default Main;
