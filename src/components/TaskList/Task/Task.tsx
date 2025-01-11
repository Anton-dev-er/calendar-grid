import { Color, Task as TaskType } from '../types.ts';
import { FC, useEffect, useState } from 'react';
import * as S from './styled.tsx';
import IconButton from '../../IconButton/IconButton.tsx';
import ColorList from '../../ColorList/ColorList.tsx';
import useTaskContext from '../../../hooks/useTaskContext.ts';
import Input from '../../Input/Input.tsx';
import useCalendarContext from '../../../hooks/useCalendarContext.ts';
import TaskAnchor from '../../TaskAnchor/TaskAnchor.tsx';
import Typography from '../../Typography/Typography.tsx';

interface Props {
  task: TaskType;
}

const Task: FC<Props> = ({ task }) => {
  const [editable, setEditable] = useState(false);
  const [taskText, setTaskText] = useState(task.text);
  const [selectedColors, setSelectedColors] = useState<Color[]>(task.colors);

  const { colors, editTask, removeTask } = useTaskContext();
  const { setSelectedCalendarDay } = useCalendarContext();

  useEffect(() => {
    setEditable(task.new);
  }, []);

  const handleEditTask = (e: any) => {
    const day = e.target.closest("[data-component='calendar-day']").dataset.day;
    task.text = taskText;
    task.colors = selectedColors;
    task.new = false;
    editTask(+day, task);

    setEditable(false);
    setSelectedCalendarDay({ day: null, month: null });
  };

  const handleRemoveTask = (e: any) => {
    const day = e.target.closest("[data-component='calendar-day']").dataset.day;
    removeTask(+day, task.id);

    setEditable(false);
    setSelectedCalendarDay({ day: null, month: null });
  };

  const handleSetEditable = (e: any) => {
    const calendarDay = e.target.closest("[data-component='calendar-day']");

    setEditable(true);
    setSelectedCalendarDay({
      day: +calendarDay.dataset.day,
      month: +calendarDay.dataset.month,
    });
  };

  return (
    <div>
      <TaskAnchor active={true}>
        <S.Task
          $editable={editable}
          data-id={task.id}
          data-component="task"
          data-double-click={false}
          data-draggable={!editable}
        >
          <ColorList
            colors={editable ? colors : selectedColors}
            selectedColors={selectedColors}
            setSelectedColors={editable ? setSelectedColors : null}
          />
          <Typography variant="small">
            {editable ? (
              <Input
                id="input-task"
                onChange={setTaskText}
                value={taskText}
                placeholder="Type task description ..."
              />
            ) : (
              task.text
            )}
          </Typography>
          <S.Actions>
            {editable ? (
              <>
                <IconButton onClick={handleEditTask} icon="check.svg" />
                <IconButton onClick={handleRemoveTask} icon="trash.svg" />
              </>
            ) : (
              <IconButton onClick={handleSetEditable} icon="edit.svg" />
            )}
          </S.Actions>
        </S.Task>
      </TaskAnchor>
    </div>
  );
};

export default Task;
