import React from 'react';
import styled from 'styled-components';

import { personaList } from '../utils/data';


const DropdownInput = ({ selectedOption, setSelectedOption, disabled }) => {
  
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <StyledDiv>
      <label htmlFor="dropdown">{"Persona: "}</label>
      <Select id="dropdown" value={selectedOption} onChange={handleOptionChange} disabled={disabled}>
        <option value="">-- Select --</option>
        {personaList.map(o => {
          return <option key={o} value={o}>{o}</option>
        })}
      </Select>
    </StyledDiv>
  );
};

export default DropdownInput;

const StyledDiv = styled.div`
  color: black;
`

const Select = styled.select`
  padding: 5px 10px;
  margin-top: 15px;
  &:focus {
    outline: none;
  }

  &:hover {
    cursor: pointer;

    &:disabled {
      cursor: not-allowed;
    }
  }
`
