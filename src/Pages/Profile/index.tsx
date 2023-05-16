import * as C from './styles';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import { setOpen } from '../../Redux/Reducers/LoginModal';
import { setOpen as setOpenEndModal } from '../../Redux/Reducers/EndModal';
import { doLogout, isLogged } from '../../Helpers/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { api } from '../../Api';
import { setUser } from '../../Redux/Reducers/User';


function Page() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const opened = useAppSelector(state => state.LoginModal.opened);
  const openedRegister = useAppSelector(state => state.RegisterModal.opened);
  const endereco = useAppSelector(state => state.Endereco.data);
  const [flag, setFlag] = useState<boolean>(false);
  
  useEffect(() => {
    if (!isLogged()) dispatch( setOpen(true) );
  }, []);

  useEffect(() => {
    if (!flag) { setFlag(!flag); return }
    if (!opened && !openedRegister && !isLogged()) navigate('/');
  }, [opened, openedRegister]);

  const handleLogout = async () => {
    doLogout();
    window.location.href = '/';
  };

  const handleEditEnd = () => {
    dispatch( setOpenEndModal(true) );
  };

  return (
    <C.Container>
      {isLogged() &&
        <div>
          <h2>
            <span className='d-inline-block me-4'>Minha Conta</span> 
            <button className='btn btn-sm btn-info' onClick={handleLogout}>Logout</button>
          </h2>

          <div className="card area-end">
            <span className='icon-edit' onClick={handleEditEnd}>
              <FontAwesomeIcon icon={faPen} />
            </span>
            <div className="card-body">
              <h5 className="card-title">Endereço de Entrega</h5>
              <p className='m-0'>{endereco.endereco}, {endereco.numero}</p>
              <p className='m-0'>{endereco.bairro} - {endereco.cidade}</p>
              <p className='m-0'>{endereco.uf} - {endereco.cep}</p>
            </div>
          </div>
          
        </div>
      }
    </C.Container>
  )
}

export default Page;