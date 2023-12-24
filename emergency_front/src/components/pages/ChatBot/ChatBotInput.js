import { useState } from "react";
import styles from "./ChatBotInput.module.css";

//isLoading 받아오기(ChatBot에서 내려준 prop)
const ChatBotInput = ({ onSubmit }) => {
  const [userInput, setUserInput] = useState("");
  //사용자 입력 받아서 상위 컴포넌트로 데이터 전달
  //loading 상태에서 사용자가 제출버튼 못 누르도록 처리
  const handleUserInput = (e) => {
    setUserInput(e.target.value);
  };
  const handleClick = () => {
    //Chatbot으로 올려준다
    onSubmit(userInput);
    setUserInput("");
  };
  return (
    <>
      <div className={styles.userInputContainer}>
        <textarea
          className={styles.userInputText}
          value={userInput}
          onChange={handleUserInput}
          placeholder="궁금한 응급처치 방법을 물어보세요"
        />
        <button onClick={handleClick}>알려줘잉</button>
      </div>
    </>
  );
};

export default ChatBotInput;
