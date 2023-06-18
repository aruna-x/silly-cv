import { useState } from 'react';
import styled from 'styled-components';

import DropdownInput from './Components/DropdownInput';
import ChatFeature from './Components/ChatFeature';

import './style/App.css'

/** 
 * Does Aruna have any experience with react, stripe.js, and ruby on rails?
 * Explain her impact on companies she has worked for.
 * Does she have experience working with cross-functional teams?
 * Tell me about a challenge Aruna has faced. 
 */

function App() {
  const [persona, setPersona] = useState('');
  const [disablePersona, setDisablePersona] = useState(false);
  const personaList = ["Snoop Dogg", "a pirate", "Shakespeare", "Dr. Seuss", "a poet", "The Beatles", "Mark Twain"];

  return (
    <div>
      <ChatFeature setDisablePersona={setDisablePersona} persona={persona} />
      <div>
        <DropdownInput options={personaList} selectedOption={persona} setSelectedOption={setPersona} disabled={disablePersona} />
        <DisclaimerDiv>{disablePersona ? "refresh to change persona" : null}</DisclaimerDiv>
      </div>
    </div>
  );
}

export default App

const DisclaimerDiv = styled.div`
  font-size: 14px;
`
