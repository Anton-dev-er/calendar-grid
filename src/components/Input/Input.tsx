import { ChangeEvent, FC } from 'react';
import * as S from './styled.tsx';

interface Props {
  id: string;
  onChange: (value: string) => void;
  placeholder: string;
  value?: string;
}

const Input: FC<Props> = ({ id, onChange, value, placeholder }) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <S.Input
      id={id}
      name={id}
      type="text"
      placeholder={placeholder}
      onChange={handleOnChange}
      value={value}
    />
  );
};

export default Input;
