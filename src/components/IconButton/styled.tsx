import styled from 'styled-components';

export const IconButton = styled.button`
  margin: 4px;
  padding: 0;
  cursor: pointer;
  outline: none;
  border: none;
  width: 16px;
  height: 16px;
  background-color: transparent;

  &:focus {
    border: none;
    outline: none;
  }
`;

export const Icon = styled.img`
  display: block;
  height: 100%;
  width: 100%;
  background-size: contain;
`;
