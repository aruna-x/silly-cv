import { useState } from 'react';
import styled from 'styled-components';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import Slider from './Slider';

import './App.css'
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import workExperience from './workExperience';

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
      content: `Expect the user to ask about my work experience. This is my work experience: ${workExperience}. If the user does not ask about my work experience, prompt them to ask about my work experience instead of making something else up. Keep your response to 3 sentences maximum. Answer in the tone of a ${'sexy scientist'}.`,
    }

    const apiRequest = {
      "model": "gpt-3.5-turbo-0613",
      "messages": [
        apiSystemMessage,
        ...apiChat
      ],
      // 0-2
      // "temperature": 0,
      "temperature": 0,

      // 0 to 1, percentage
      // "top_p": 0.1,
      "top_p": .1,

      // -2 to 2
      "presence_penalty": 0,

      // -2 to 2
      "frequency_penalty": 0
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
    <FlexContainer>
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
      <div>
        Character/Tone: <input placeholder="e.g. pirate" />
        <Slider/>
      </div>
    </FlexContainer>
  );
}

export default App

const FlexContainer = styled.div`
  display: flex;
  flex-direction: row;
`
