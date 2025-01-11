import { FC, ReactNode } from 'react';
import * as S from './styled.tsx';

interface Props {
  children: ReactNode;
  onClick: (a: any) => void;
  active?: boolean;
}

const Button: FC<Props> = ({ children, onClick, active = false }) => {
  return (
    <S.Button onClick={onClick} $active={active}>
      {children}
    </S.Button>
  );
};

export default Button;
