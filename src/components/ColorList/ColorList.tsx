import * as S from './styled.tsx';
import { Color } from '../TaskList/types.ts';
import { FC } from 'react';

interface Props {
  colors: Color[];
  setSelectedColors: ((colors: Color[]) => void) | null;
  selectedColors: Color[];
}

const ColorList: FC<Props> = ({ colors, setSelectedColors, selectedColors }) => {
  const handleOnClickColor = (id: number, color: string) => {
    if (!setSelectedColors) {
      return;
    }

    const isAdded = selectedColors.find((color) => color.id === id);

    if (isAdded) {
      setSelectedColors(selectedColors.filter((color) => color.id !== id));
    } else {
      setSelectedColors([...selectedColors, { id, color }]);
    }

    return;
  };

  const isColorSelected = (id: number) => {
    if (!setSelectedColors) {
      return true;
    }

    return !!selectedColors.find((color) => color.id === id);
  };

  return (
    <S.ColorList>
      {colors.map(({ id, color }) => (
        <S.Color
          key={id}
          $color={color}
          $isColorSelected={isColorSelected(id)}
          onClick={() => handleOnClickColor(id, color)}
        />
      ))}
    </S.ColorList>
  );
};

export default ColorList;
