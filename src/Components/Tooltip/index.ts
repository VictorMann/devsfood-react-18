import React, { useRef, useEffect } from 'react';
import { Tooltip as BsTooltip } from "bootstrap";

type Props = {
  children: JSX.Element;
  title: string;
  dir?: 'right'|'top'|'left'|'bottom';
}

export const Tooltip = ({children, title, dir}: Props) => {
  const childRef = useRef({} as Element);
  dir = dir ?? 'right';
  
  useEffect(() => {
    const t = new BsTooltip(childRef.current, {
      title,
      placement: dir,
      trigger: 'hover'
    });
    return () => t.dispose();
  }, [title]);

  return React.cloneElement(children, { ref: childRef });
};