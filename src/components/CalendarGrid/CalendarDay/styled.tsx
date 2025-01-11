import styled from 'styled-components';

export const CalendarDay = styled.div<{ $disabled: boolean; $selected: boolean }>`
  padding-bottom: 25px;
  overflow: auto;
  position: relative;
  scrollbar-width: none;
  background-color: ${({ theme, $selected }) => ($selected ? '#fff' : theme.colors.gray)};
  outline: ${({ theme }) => theme.colors.darkGray} 1px solid;
  box-shadow: ${({ theme, $selected }) => ($selected ? theme.boxShadow : 'unset')};
  z-index: ${({ $selected }) => ($selected ? 2 : 1)};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? 'none' : 'unset')};
`;

export const AddTask = styled.div`
  position: absolute;
  top: 4px;
  right: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.black};
  cursor: pointer;
`;
