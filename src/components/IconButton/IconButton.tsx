import { FC } from 'react';
import * as S from './styled.tsx';

interface Props {
  onClick: (a: any) => void;
  icon: string;
}

const IconButton: FC<Props> = ({ onClick, icon }) => {
  return (
    <S.IconButton onClick={onClick} data-draggable="false">
      <S.Icon $link={icon} />
    </S.IconButton>
  );
};

export default IconButton;
