import styled from 'styled-components';
import { 
  MainContainer, 
  ChatContainer, 
  MessageList, 
  Message, 
  MessageInput, 
  TypingIndicator 
} from "@chatscope/chat-ui-kit-react";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import { workExperience } from '../utils/data';


function ChatFeature({ setDisablePersona, persona, isTyping, setIsTyping, chatHistory, setChatHistory }) {
  const VITE_OPENAI_KEY = import.meta.env.VITE_OPENAI_KEY;

  async function handleSend(p) {
    const newHistory = [...chatHistory, {message: p, sender: "user", direction: "outgoing"}]
    setChatHistory(newHistory);
    setIsTyping(true);

    await callToChatGPT(newHistory);
  }

  async function callToChatGPT(newHistory) {
    setDisablePersona(true);

    let apiChat = newHistory.map(m=>{
      let role = m.sender === "SillyCV" ? "assistant" : "user";
      return {role: role, content: m.message};
    });

    const apiSystemMessage = {
      role: "system",
      content: `Expect the user to ask about my work experience. 
        This is my work experience: ${workExperience}. 
        If the user does not ask about my work experience, 
        prompt them to ask about my work experience instead of making something else up. 
        Keep your response to 5 sentences maximum.`,
    }

    const personaSystemMessage = {
      role: "system",
      content: `Answer as ${persona ?? "a helpful assistant"}.`
    };

    const apiRequest = {
      "model": "gpt-3.5-turbo-0613",
      "messages": [
        apiSystemMessage,
        ...apiChat,
        personaSystemMessage,
      ],
      // todo: how to expose these in a user-friendly way?
      "temperature": 1, // 0-2
      "top_p": 1, // 0 to 1, percentage
      "presence_penalty": 0, // -2 to 2
      "frequency_penalty": 0 // -2 to 2
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
    <ChatStyle>
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
    </ChatStyle>
  )
}

export default ChatFeature;

const ChatStyle = styled.div`
  margin: auto;
  height: 65vh;
  width: 45vw;
  @media (max-width: 768px) {
    width: 80vw;
  }
`
