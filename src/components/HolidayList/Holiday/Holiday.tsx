import { FC } from 'react';
import { Holiday as HolidayType } from '../../../api/date/types.ts';
import * as S from './styled.tsx';
import Typography from '../../Typography/Typography.tsx';
import TaskAnchor from '../../TaskAnchor/TaskAnchor.tsx';

interface Props {
  holiday: HolidayType;
}

const Holiday: FC<Props> = ({ holiday }) => {
  return (
    <div>
      <TaskAnchor active={true}>
        <S.Holiday>
          <Typography variant="small">{holiday.name}</Typography>
        </S.Holiday>
      </TaskAnchor>
    </div>
  );
};

export default Holiday;
