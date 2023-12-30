import { useState } from "react";
import "./ChatBotInput.css";
import send from "../../../assets/sendbutton.png";
//isLoading 받아오기(ChatBot에서 내려준 prop)
const ChatBotInput = ({ onSubmit }) => {
  const imgStyle = {
    width: "42px",
    height: "42px",
  };
  const [userInput, setUserInput] = useState("");
  //사용자 입력 받아서 상위 컴포넌트로 데이터 전달
  //loading 상태에서 사용자가 제출버튼 못 누르도록 처리
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleClick();
    }
  };
  const handleClick = () => {
    //Chatbot으로 올려준다
    onSubmit(userInput);
    setUserInput("");
  };

  return (
    <>
      <div className="userInputContainer">
        <div className="userInput-textarea">
          <textarea
            className="userInputText"
            value={userInput}
            onChange={handleUserInput}
            // enter 눌러도 요청 보내짐
            onKeyDown={handleKeyDown}
            placeholder="궁금한 응급처치 방법을 물어보세요"
          />
        </div>
        <div className="userInput-button">
          <button onClick={handleClick}>
            <img style={imgStyle} src={send} />
          </button>
        </div>
      </div>
    </>
  );
};

export default ChatBotInput;
