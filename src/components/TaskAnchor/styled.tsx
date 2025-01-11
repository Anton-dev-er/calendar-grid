import styled from 'styled-components';

export const TaskAnchor = styled.span<{ $height: number }>`
  display: block;
  margin: 2px 8px;
  height: 4px;
  opacity: 0;
  border-radius: 6px;
  background-color: ${({ theme }) => theme.colors.lightBlue};
  position: relative;
`;
