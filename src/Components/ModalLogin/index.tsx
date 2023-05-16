import * as C from './styles';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../Redux/Reducers/LoginModal';
import { setOpen as setOpenRegister } from '../../Redux/Reducers/RegisterModal';
import Modal from '../Modal';
import { useState } from 'react';

import { api } from '../../Api';
import { doLoggin } from '../../Helpers/auth';

const styles = {
  maxWidth: '400px',
};


function Comp() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const resp = await api.login(email, password);
    if (resp.error) {
      alert(resp.error);
      setDisabled(false);
    } else {
      doLoggin(resp.token);
      window.location.reload();
    }
  };

  const handleRegister = () => {
    dispatch( setOpenRegister(true) );
  };

  return (
    <Modal setClose={() => dispatch(setOpen(false))} styles={styles}>
      <C.Container>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <div className='mb-3'>
              <input 
                type="email"
                className="form-control form-control-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='E-mail'
                disabled={disabled}
                required
                autoFocus />
            </div>

            <div className='mb-3'>
              <input 
                type="password"
                className="form-control form-control-sm"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Senha'
                disabled={disabled}
                required />
            </div>

            <div className='d-flex justify-content-between'>
              <button type="button" onClick={handleRegister} className="btn btn-sm btn-link close-modal">Registrar</button>
              <button className='btn btn-sm btn-success w-50'>Entrar</button>
            </div>
          </fieldset>
        </form>
      </C.Container>
    </Modal>
  )
}

export default Comp;