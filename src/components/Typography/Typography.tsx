import * as S from './styled.tsx';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  align?: 'left' | 'center' | 'right';
  variant?: 'small' | 'medium' | 'large';
}

const Typography: FC<Props> = ({ children, align = 'left', variant = 'medium' }) => {
  return (
    <S.Typography $align={align} $variant={variant}>
      {children}
    </S.Typography>
  );
};

export default Typography;
