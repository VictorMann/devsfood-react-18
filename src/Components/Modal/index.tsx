import * as C from './styles';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { delay } from '../../Helpers';

type Props = {
  children: JSX.Element;
  onBeforeProcess?: (state: boolean) => any;
  onAfterProcess?: (state: boolean) => any;
  setClose: (...key: any[]) => any;
  styles?: {[key: string]: any};
}

function Comp({ children, onBeforeProcess, onAfterProcess, setClose, styles = {} }: Props) {
  const dispatch = useDispatch();
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    onBeforeProcess && dispatch( onBeforeProcess(true) );
    onAfterProcess && dispatch( onAfterProcess(false) );

    setTimeout(() => setActive(true), 10);
  }, []);

  const fnClose = async (e: any) => {
    if (!e.target.classList.contains('close-modal')) return;
    setActive(false);
    await delay(300);
    setClose();
    onBeforeProcess && dispatch( onBeforeProcess(false) );
    onAfterProcess && dispatch( onAfterProcess(false) );
  };

  return (
    <C.Container className='close-modal' onClick={fnClose}>
      <div className={active ? 'modal-body active' : 'modal-body'} style={{...styles}}>
        {children}
      </div>
    </C.Container>
  )
}

export default Comp;