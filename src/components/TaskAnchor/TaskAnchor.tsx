import * as S from './styled.tsx';
import { FC, ReactNode, useEffect, useRef, useState } from 'react';

interface Props {
  children: ReactNode;
  active: boolean;
}

const TaskAnchor: FC<Props> = ({ children, active }) => {
  const ref = useRef(null);
  const [targetHeight, setTargetHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const anchor = ref.current as HTMLElement;
      const targetElement = anchor.parentElement?.querySelector("[data-component='task']");
      setTargetHeight(targetElement?.clientHeight || 0);
    }
  }, [ref.current]);

  return (
    <div data-anchor-active={active}>
      {children}
      <S.TaskAnchor ref={ref} data-component="task-anchor" $height={targetHeight} />
    </div>
  );
};

export default TaskAnchor;
