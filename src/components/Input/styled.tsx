import styled from 'styled-components';

export const Input = styled.input`
  border: none;
  outline: none;
  border-bottom: ${({ theme }) => `2px solid ${theme.colors.blue}`};
  padding-bottom: 4px;
  font-size: 16px;
  width: 100%;
  background-color: transparent;
  height: fit-content;
  color: ${({ theme }) => theme.colors.black};

  &:focus {
    border: none;
    outline: none;
    border-bottom: ${({ theme }) => `2px solid ${theme.colors.blue}`};
  }
`;
