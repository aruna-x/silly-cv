import React from 'react';
import styled from 'styled-components';

const DropdownInput = ({options, selectedOption, setSelectedOption}) => {
  
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <label htmlFor="dropdown">{"Persona: "}</label>
      <Select id="dropdown" value={selectedOption} onChange={handleOptionChange}>
        <option value="">-- Select --</option>
        {options.map(o => {
          return <option value={o}>{o}</option>
        })}
      </Select>
    </div>
  );
};

export default DropdownInput;

const Select = styled.select`
  padding: 5px 10px;
  margin: 15px 0px 5px 0px;
  &:focus {
    outline: none;
  }
`
