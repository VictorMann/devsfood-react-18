import * as C from './styles';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setOpen, setStateBefore, setStateAfter } from '../../Redux/Reducers/PedidoModal';
import { setCart } from '../../Redux/Reducers/Cart';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import Modal from '../Modal';
import { api } from '../../Api';

const styles = {};


function Comp() {
  const navigate = useNavigate();
  const fieldRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const end = useAppSelector(state => state.Endereco.data);
  const cart = useAppSelector(state => state.Cart.data);
  const [payment, setPayment] = useState('');


  const bntHandleCompra = async () => {
    if (!payment) {
      alert('Selecione um meio de pagamento');
      return;
    }
    const totalPrice = (): number => cart.reduce((r, item) => (item.qtd * Number(item.item.price)) + r, 0);
    const discount = 1;
    const xCart: any[] = cart.map(i => ({product: i.item.id, qtd: i.qtd}));
    let resp = await api.orderStore(xCart, totalPrice() - discount);
    if (resp.error) {
      alert(resp.error);
      return;
    }
    dispatch( setStateAfter(true) );
    dispatch( setCart([]) );
    fieldRef.current?.click();
    navigate('/order');
  };

  return (
    <Modal onAfterProcess={setStateAfter} setClose={() => dispatch(setOpen(false))} styles={styles}>
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
          <button ref={fieldRef} className='btn btn-sm btn-outline-secondary me-2 close-modal'>Cancelar</button>
          <button onClick={bntHandleCompra} className='btn btn-sm btn-success'>FINALIZAR COMPRA</button>
        </div>

      </C.Container>
    </Modal>
  )
}

export default Comp;