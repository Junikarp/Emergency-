// Main.js
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import MyPage from "./components/pages/MyPage/MyPage";
import Home from "./components/pages/Home";
import ChatBot from "./components/pages/ChatBot/ChatBot";
import FirstAid from "./components/pages/FirstAid/FirstAid";
import OuchAndAllergy from "./components/pages/MyPage/OuchAndAllergy";
import TakingMedicine from "./components/pages/MyPage/TakingMedicine";
import EmergencyHP from "./components/pages/MyPage/EmergencyHP";
import DiagnosisHX from "./components/pages/MyPage/DiagnosisHX";
import MyPageDetail from "./components/pages/MyPage/MyPageDetail";

const Main = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="firstaid" element={<FirstAid />} />
        <Route path="mypage">
          <Route index element={<MyPage />} />
          <Route path="mypagedetail" element={<MyPageDetail />} />
          <Route path="ouchandallergy" element={<OuchAndAllergy />} />
          <Route path="diagnosishx" element={<DiagnosisHX />} />
          <Route path="takingmedicine" element={<TakingMedicine />} />
          <Route path="emergencyhp" element={<EmergencyHP />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default Main;
