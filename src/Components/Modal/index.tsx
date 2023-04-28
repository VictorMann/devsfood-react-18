import * as C from './styles';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../Redux/Reducers/ProductModal';

import { delay } from '../../Helpers';

type Props = {
  children: JSX.Element;
  onBeforeProcess?: (state: boolean) => any;
  onAfterProcess?: (state: boolean) => any;
}

function Comp({ children, onBeforeProcess, onAfterProcess }: Props) {
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
    dispatch( setOpen(false) );
    onBeforeProcess && dispatch( onBeforeProcess(false) );
    onAfterProcess && dispatch( onAfterProcess(false) );
  };

  return (
    <C.Container className='close-modal' onClick={fnClose}>
      <div className={active ? 'modal-body active' : 'modal-body'}>
        {children}
      </div>
    </C.Container>
  )
}

export default Comp;