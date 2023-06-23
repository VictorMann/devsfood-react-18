import * as C from './styles';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setOpen } from '../../Redux/Reducers/PedidoModal';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import Modal from '../Modal';

const styles = {};


function Comp() {
  const dispatch = useDispatch();
  const end = useAppSelector(state => state.Endereco.data);
  const [payment, setPayment] = useState('');


  const bntHandleCompra = () => {
    if (!payment) {
      alert('Selecione um meio de pagamento');
      return;
    }
  };

  return (
    <Modal setClose={() => dispatch(setOpen(false))} styles={styles}>
      <C.Container>
        <div className='ctn-order'>
          <div onClick={() => setPayment('pix')} className={payment === 'pix' ? 'order-icon-pix active' : 'order-icon-pix'}></div>
          <div onClick={() => setPayment('bol')} className={payment === 'bol' ? 'order-icon-bol active' : 'order-icon-bol'}></div>
          <div onClick={() => setPayment('credit')} className={payment === 'credit' ? 'order-icon-credit active' : 'order-icon-credit'}></div>
        </div>

        <div className='mt-4'>
          <div className='fw-bold'>Endereço de Entrega</div>
          <div>{end.endereco}, {end.numero} {end.complemento}</div>
          <div>{end.bairro} - {end.cidade} - {end.uf}</div>
          <div>{end.cep}</div>
        </div>

        <div className='ctn-button mt-2'>
          <button className='btn btn-sm btn-outline-secondary me-2 close-modal'>Cancelar</button>
          <button onClick={bntHandleCompra} className='btn btn-sm btn-success'>FINALIZAR COMPRA</button>
        </div>

      </C.Container>
    </Modal>
  )
}

export default Comp;