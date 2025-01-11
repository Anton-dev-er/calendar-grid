import styled from 'styled-components';

export const Typography = styled.p<{
  $align: 'left' | 'center' | 'right';
  $variant: 'small' | 'medium' | 'large';
}>`
  font-weight: ${({ $variant }) => ($variant === 'medium' ? 'bold' : 'normal')};
  color: ${({ theme }) => theme.colors.black};
  padding: ${({ theme, $variant }) => ($variant === 'medium' ? theme.spacing : 0)};
  margin: 0;
  text-align: ${({ $align }) => $align};
  height: fit-content;
`;
