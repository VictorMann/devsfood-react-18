import * as C from './styles';
import { useState, useRef } from 'react';
import MaskedInput from 'react-text-mask';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import { setEndereco } from '../../Redux/Reducers/Endereco';
import { setOpen } from '../../Redux/Reducers/EndModal';
import Modal from '../Modal';
import { api } from '../../Api';
import { EnderecoType } from '../../Types';
import { get } from '../../Helpers';

const styles = {
  maxWidth: '400px',
};


function Comp() {
  const fieldRef = useRef(null);
  const dispatch = useDispatch();
  const endereco = useAppSelector(state => state.Endereco.data);
  const [end, setEnd] = useState<string>(get(endereco.endereco));
  const [num, setNum] = useState<string>(get(endereco.numero));
  const [compl, setCompl] = useState<string>(get(endereco.complemento));
  const [cep, setCEP] = useState<string>(get(endereco.cep));
  const [city, setCity] = useState<string>(get(endereco.cidade));
  const [bairro, setBairro] = useState<string>(get(endereco.bairro));
  const [uf, setUF] = useState<string>(get(endereco.uf));

  const [disabled, setDisabled] = useState<boolean>(false);

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
    const xEnd: EnderecoType = {id: endereco.id, endereco: end, numero: num, complemento: compl, cep, cidade: city, bairro, uf};
    let resp = await api.editEnd(xEnd);
    if (resp.error) { alert(resp.error); setDisabled(false); }
    else {
      dispatch( setEndereco(xEnd) );
      let el: any = fieldRef.current;
      el.click();
    }
  };


  return (
    <Modal setClose={() => dispatch(setOpen(false))} styles={styles}>
      <C.Container>
        <form onSubmit={handleSubmit}>
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
            <button ref={fieldRef} type="button" className="btn btn-sm btn-link close-modal">Cancelar</button>
            <button className='btn btn-sm btn-success w-50'>Cadastrar</button>
          </div>

        </form>
      </C.Container>
    </Modal>
  )
}

export default Comp;