import styled from 'styled-components';

export const ColorList = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
`;

export const Color = styled.li<{ $color: string; $isColorSelected: boolean }>`
  background-color: ${({ $color }) => $color};
  width: 36px;
  height: 6px;
  border-radius: 3px;
  list-style: none;
  opacity: ${({ $isColorSelected }) => ($isColorSelected ? 1 : 0.2)};
  margin-right: ${({ theme }) => theme.spacing};
  margin-bottom: ${({ theme }) => theme.spacing};
  cursor: pointer;
`;
