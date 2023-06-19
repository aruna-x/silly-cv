import { useState } from 'react';
import styled from 'styled-components';

import DropdownInput from './Components/DropdownInput';
import PromptIdeasButton from './Components/PromptIdeasButton'
import ChatFeature from './Components/ChatFeature';

import './style/App.css'

function App() {
  const [persona, setPersona] = useState('');
  const [disablePersona, setDisablePersona] = useState(false);
  const [chatHistory, setChatHistory] = useState([{
    message: "Hi, I'm SillyCV. Ask me anything about Aruna's resume.",
    sender: "SillyCV",
  },]);
  const [isTyping, setIsTyping] = useState(false);

  return (
    <div>
      <ChatFeature setDisablePersona={setDisablePersona} persona={persona} isTyping={isTyping} setIsTyping={setIsTyping} chatHistory={chatHistory} setChatHistory={setChatHistory}/>
      <Flex>
        <div>
          <DropdownInput selectedOption={persona} setSelectedOption={setPersona} disabled={persona && disablePersona} />
          <DisclaimerDiv>{(persona && disablePersona) ? "refresh to change persona" : null}</DisclaimerDiv>
        </div>
        <PromptIdeasButton setIsTyping={setIsTyping} chatHistory={chatHistory} setChatHistory={setChatHistory}/>
      </Flex>
    </div>
  );
}

export default App

const DisclaimerDiv = styled.div`
  font-size: 14px;
  color: black;
`

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
