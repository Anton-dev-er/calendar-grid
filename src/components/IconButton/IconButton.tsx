import { FC } from 'react';
import * as S from './styled.tsx';
import ArrowLeftIcon from '../../../src/assets/arrow-left.svg';
import ArrowRightIcon from '../../../src/assets/arrow-right.svg';
import CheckIcon from '../../../src/assets/check.svg';
import EditIcon from '../../../src/assets/edit.svg';
import PlusIcon from '../../../src/assets/plus.svg';
import TrashIcon from '../../../src/assets/trash.svg';

interface Props {
  onClick: (a: any) => void;
  icon: 'arrow-left' | 'arrow-right' | 'check' | 'edit' | 'plus' | 'trash';
}

const mappedIcons: { [key: string]: string } = {
  'arrow-left': ArrowLeftIcon,
  'arrow-right': ArrowRightIcon,
  check: CheckIcon,
  edit: EditIcon,
  plus: PlusIcon,
  trash: TrashIcon,
};

const IconButton: FC<Props> = ({ onClick, icon }) => {
  return (
    <S.IconButton onClick={onClick} data-draggable="false">
      <S.Icon src={mappedIcons[icon]} />
    </S.IconButton>
  );
};

export default IconButton;
