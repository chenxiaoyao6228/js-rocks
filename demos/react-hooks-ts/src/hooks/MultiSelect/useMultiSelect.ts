// 封装基本的事件处理逻辑
import { useRef, useState } from 'react';
import MultiSelect from './MultiSelect';
import type { IdWise, Config } from './MultiSelect';

const useMultiSelect = <T extends IdWise, C extends Config>(
  initialState: T[],
  config: C,
) => {
  const msRef = useRef<MultiSelect<T>>(new MultiSelect(initialState, config));
  const [selected, setSelected] = useState<T[]>([]);
  const handleClick = (e: MouseEvent, item: T) => {
    if (e.shiftKey) {
      setSelected(msRef.current.shift(item));
    } else if (e.ctrlKey) {
      setSelected(msRef.current.ctrl(item));
    } else {
      setSelected(msRef.current.select(item));
    }
  };
  const update = (newState: T[]) => {
    setSelected(msRef.current.update(newState));
  };
  const all = () => {
    setSelected(msRef.current.all());
  };

  const empty = () => {
    setSelected(msRef.current.empty());
  };
  return [selected, handleClick, update, all, empty];
};

export default useMultiSelect;
