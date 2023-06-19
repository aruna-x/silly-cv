import styled from 'styled-components';

import { promptList } from '../utils/data';

function PromptIdeasButton({ setIsTyping, chatHistory, setChatHistory }) {
  function handleSubmit(e) {
    e.preventDefault();
    setIsTyping(true);
    const newHistory = [...chatHistory, {message: promptList, sender: "SillyCV"}];

    setTimeout(() => {
      setChatHistory(newHistory);
      setIsTyping(false);
    }, 1500);
  }

  return (
    <Button onClick={handleSubmit}>Ask SillyCV for ideas</Button>
  )
}

export default PromptIdeasButton;

const Button = styled.button`
  padding: 10px 15px;
  margin: 15px 0px 5px 0px;
  outline: none;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: #e6e6e6;
  }
`
