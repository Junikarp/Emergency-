import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./components/pages/MyPage";

const Main = () => {
  <BrowserRouter>
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="chatbot" element={<ChatBot />} />
        <Route path="firstaid" element={<FirstAid />} />
        <Route path="mypage" element={<MyPage />} />
      </Routes>
    </App>
  </BrowserRouter>;
};

export default Main;
