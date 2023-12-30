import { Link } from "react-router-dom";
import { useState } from "react";
import { CallGPT } from "../../api/ChatGpt";
import ChatBotInput from "./ChatBotInput";
import menu from "../../../assets/menubar.png";
import firstaid from "../../../assets/firstaid.png";
import home from "../../../assets/home.png";
import mypage from "../../../assets/mypage.png";
import chatbotImg from "../../../assets/chatbotResult.png";
import "./ChatBot.css";
const apiKey = process.env.REACT_APP_GPT_API_KEY;
// const dummyData = `{"respond": "이가 빠진 경우, 즉시 다음과 같은 조치를 취해야 합니다:
//   1. 치아가 땅에 떨어져 있을 경우, 깨끗한 흐르는 물로 치아를 씻어주세요
//   2. 두 손으로 치아를 잡아 부모님 또는 보호자께서 치과 의사를 방문할 수 있도록 보관해주세요.
//   3. 치과 의사에게 즉시 연락하여 긴급한 상황임을 알려주세요.\n\n치과 의사의 전문적인 도움이 필요하기 때문에 가능한 빨리 전문가의 도움을 받을 수 있도록 하세요."}`;
const ChatBot = () => {
  const imgStyle = {
    width: "30px",
    height: "30px",
  };
  const [data, setData] = useState("");
  // const [userChat, setUserChat] = useState([]);
  // const [gptChat, setGptChat] = useState([]);
  const [chat, setChat] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleClickAPICall = async (userInput) => {
    // console.log(apiKey);
    try {
      setIsLoading(true);
      //message는 문자열로 받고
      //여기는 배열에 한번에 저장해서 상태 출력해서 내 input이랑 gpt응답이 같이 뜸
      //     const message = await CallGPT(apiKey, {
      //       prompt: `${userInput}`,
      //     });
      //     console.log(message);
      //     //setData 해줄때는 json으로 해주기
      //     setData(JSON.parse(message));
      //     //사용자 input저장하기
      //     setChat((prevChat) => [
      //       ...prevChat,
      //       { role: "user", content: userInput },
      //       { role: "gpt", content: JSON.parse(message).respond },
      //     ]);
      //   } catch (error) {
      //     console.log(error);
      //   } finally {
      //     setIsLoading(false);
      //   }
      // };

      //-----------------------------------
      // 사용자 입력 메시지를 먼저 추가
      setChat((prevChat) => [
        ...prevChat,
        { role: "user", content: userInput },
      ]);

      // GPT 응답 받아오기
      const message = await CallGPT(apiKey, {
        prompt: `${userInput}`,
      });

      // GPT 응답 메시지 추가
      setChat((prevChat) => [
        ...prevChat,
        { role: "gpt", content: JSON.parse(message).respond },
      ]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (userInput) => {
    console.log(userInput);
    handleClickAPICall(userInput);
  };

  return (
    <>
      <header className="chatbot-header">
        <h2>이응</h2>
        <div>
          <button className="chatbot-header-menubar">
            <img src={menu} style={imgStyle} />
          </button>
          <div className="chatbot-menubar-dropdown">
            <Link to="/">
              <img src={home} style={imgStyle} />
            </Link>
            <Link to="/firstaid">
              <img style={imgStyle} src={firstaid}></img>
            </Link>
            <Link to="/mypage">
              <img style={imgStyle} src={mypage}></img>
            </Link>
          </div>
        </div>
      </header>
      <div className="chatbot-message-container">
        {chat.map((message, index) => (
          <div key={index}>
            {message.role === "user" ? (
              <div className="userChat">
                <div className="chatbot-message">
                  <p>{message.content}</p>
                </div>
              </div>
            ) : (
              <div className="chatbot-message-chatgpt-img">
                <div className="chatbot-img">
                  <img src={chatbotImg} id="chatbotImg" />
                </div>
                <div className="gptChat">
                  <div className="chatbot-message">
                    <p>{message.content}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* prop 보내주기 => input한테! isLoading이랑 onSubmit*/}
      {/* <div>data : {data?.respond}</div> */}
      {/* <div>isLoading : {isLoading ? "loading.." : "fin"}</div> */}
      <div className="chatbot-input">
        <ChatBotInput isLoading={isLoading} onSubmit={handleSubmit} />
      </div>

      {/* <FooterNav /> */}
    </>
  );
};

export default ChatBot;
