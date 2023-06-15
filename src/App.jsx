import { useState } from 'react'
import './App.css'

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";

function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([{
      message: "Hello! I'm SillyCV. Ask me anything about Aruna's resume.",
      sender: "SillyCV",
  },]);

  const VITE_OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

  async function handleSend(m) {
    const newHistory = [...chatHistory, {message: m, sender: "user", direction: "outgoing"}]
    setChatHistory(newHistory);
    setIsTyping(true);

    await callToChatGPT(newHistory);
  }

  async function callToChatGPT(newHistory) {
    let apiChat = newHistory.map(m=>{
      let role = m.sender === "SillyCV" ? "assistant" : "user";
      return {role: role, content: m.message};
    })

    const apiSystemMessage = {
      role: "system",
      content: "Tell me a silly story.",
    }

    const apiRequest = {
      "model": "gpt-3.5-turbo-0613",
      "messages": [
        apiSystemMessage,
        ...apiChat
      ]
    }

    await fetch('https://api.openai.com/v1/chat/completions', {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + VITE_OPENAI_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequest)
    })
    .then(r => {
      if (!r.ok) {
        r.json().then(r=>console.log(r.error.message));
        throw new Error("Oops, there was an error with the API call.");
      }
      else {
        return r.json();
      }
    })
    .then(r => {
      setChatHistory([...newHistory, {sender: "SillyCV", message: r.choices[0].message.content}]);
      setIsTyping(false);
    })
  }

  return (
    <>
      <div style={{ position: "relative", height: "65vh", width: "40vw" }}>
        <MainContainer>
          <ChatContainer>
            <MessageList
              scrollBehavior="smooth"
              typingIndicator={isTyping ? <TypingIndicator content="SillyCV is typing"/> : null}
            >
              {chatHistory.map((m, i) => <Message key={i} model={m} />)}
            </MessageList>
            <MessageInput placeholder="Type message here" onSend={handleSend} attachButton={false} autoFocus />
          </ChatContainer>
        </MainContainer>
      </div>
    </>
  );
}

export default App
