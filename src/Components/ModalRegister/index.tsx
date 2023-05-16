import * as C from './styles';
import { useState } from 'react';
import { useEffect } from 'react';
import MaskedInput from 'react-text-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../Redux/Reducers/RegisterModal';
import { setOpen as setOpenLogin } from '../../Redux/Reducers/LoginModal';
import Modal from '../Modal';
import { api } from '../../Api';

import { doLoggin } from '../../Helpers/auth';
import { EnderecoType, UserType } from '../../Types';

const styles = {
  maxWidth: '400px',
};


function Comp() {
  const dispatch = useDispatch();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPass, setConfirmPass] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [num, setNum] = useState<string>('');
  const [compl, setCompl] = useState<string>('');
  const [cep, setCEP] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [bairro, setBairro] = useState<string>('');
  const [uf, setUF] = useState<string>('');

  const [disabled, setDisabled] = useState<boolean>(false);

  const handleLogin = () => {
    dispatch( setOpenLogin(true) );
  };

  const handleBntCep = async () => {
    let xCep = cep.replace(/\D/g, '');
    if (xCep.length != 8) {
      alert('Complete o CEP');
      return;
    }
    let resp = await api.getCEP(xCep);
    if (resp.erro) {
      alert("CEP invalido.");
      setCEP('');
    } else {
      setEnd(resp.logradouro);
      setBairro(resp.bairro);
      setCity(resp.localidade);
      setUF(resp.uf);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    const user: UserType = {name, email, password};
    const xEnd: EnderecoType = {endereco: end, numero: num, complemento: compl, cep, cidade: city, bairro, uf};
    let resp = await api.register(user, xEnd);
    if (resp.error) { alert(resp.error); setDisabled(false); }
    else {
      doLoggin(resp.token);
      window.location.reload();
    }
  };


  return (
    <Modal setClose={() => dispatch(setOpen(false))} styles={styles}>
      <C.Container>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Cadastrar-se</legend>

            <div className='mb-3'>
              <input 
                className="form-control form-control-sm"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='Nome'
                disabled={disabled}
                required
                autoFocus />
            </div>

            <div className='mb-3'>
              <input 
                type="email"
                className="form-control form-control-sm"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='E-mail'
                disabled={disabled}
                required />
            </div>

            <div className='mb-3'>
              <input 
                type="password"
                className="form-control form-control-sm w-75"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Senha'
                disabled={disabled}
                required />
            </div>

            <div className='mb-3'>
              <input 
                type="password"
                className="form-control form-control-sm w-75"
                value={confirmPass}
                onChange={e => setConfirmPass(e.target.value)}
                placeholder='Confirmar senha'
                disabled={disabled}
                required />
            </div>
          </fieldset>

          <fieldset className='register-end'>
            <legend>Endereço de Entrega</legend>

            <div className='row mb-3'>
              <div className="col-9">
                <input 
                  className="form-control form-control-sm"
                  value={end}
                  onChange={e => setEnd(e.target.value)}
                  placeholder='Endereço'
                  disabled={!!1}
                  required />
              </div>
              <div className="col-3">
                <input 
                  className="form-control form-control-sm"
                  value={num}
                  onChange={e => setNum(e.target.value)}
                  placeholder='Nº'
                  disabled={disabled}
                  required />
              </div>
            </div>

            <div className='mb-3'>
              <input 
                type="text"
                className="form-control form-control-sm w-100"
                value={compl}
                onChange={e => setCompl(e.target.value)}
                placeholder='Complemento'
                disabled={disabled} />
            </div>


            <div className='row mb-3'>
              <div className="col-5">
                <div className="input-group">
                  <MaskedInput
                    mask={[ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/]}
                    className="form-control form-control-sm"
                    value={cep}
                    onChange={e => setCEP(e.target.value)}
                    placeholder='CEP'
                    disabled={disabled}
                    required />

                    <button 
                      className="btn btn-sm btn-outline-secondary" 
                      type="button"
                      onClick={handleBntCep}>

                        <FontAwesomeIcon icon={faMagnifyingGlass} />

                    </button>
                </div>
              </div>
              <div className="col-7">
                <input 
                  className="form-control form-control-sm"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder='Cidade'
                  disabled={!!1}
                  required />
              </div>
            </div>

            <div className='row mb-3'>
            <div className="col-9">
                <input 
                  className="form-control form-control-sm"
                  value={bairro}
                  onChange={e => setBairro(e.target.value)}
                  placeholder='Bairro'
                  disabled={!!1}
                  required />
              </div>
              <div className="col-3">
                <input 
                  className="form-control form-control-sm"
                  value={uf}
                  onChange={e => setUF(e.target.value)}
                  placeholder='UF'
                  disabled={!!1}
                  required />
              </div>
            </div>
          </fieldset>

          <div className='d-flex justify-content-between'>
            <button type="button" onClick={handleLogin} className="btn btn-sm btn-link close-modal">Voltar ao login</button>
            <button className='btn btn-sm btn-success w-50'>Cadastrar</button>
          </div>

        </form>
      </C.Container>
    </Modal>
  )
}

export default Comp;