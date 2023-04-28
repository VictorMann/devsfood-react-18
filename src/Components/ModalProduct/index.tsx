import * as C from './styles';
import { useState, useRef } from 'react';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import { setAdd } from '../../Redux/Reducers/Cart'; 
import { setStateBefore, setStateAfter } from '../../Redux/Reducers/ProductModal'; 
import Modal from '../Modal';
import { formatMoeda } from '../../Helpers';
import { CartItemType } from '../../Types';

function Comp() {
  const closeField = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();
  const cart = useAppSelector(state => state.Cart.data);
  const [qt, setQt] = useState<number>(1);
  const product = useAppSelector(state => state.ProductModal.product);

  const handleClickConfig = (operator: string) => {
    if (operator === '-') (qt > 1) && setQt(qt - 1);
    else setQt(qt + 1);
  }

  const addCart = () => {
    let xCart: CartItemType[] = JSON.parse(JSON.stringify(cart));
    let pos = xCart.findIndex(x => x.item.id === product.id);
    if (pos !== -1) xCart[pos].qtd += qt;
    else xCart.push({qtd: qt, item: product});
    dispatch( setAdd(xCart) );
    dispatch( setStateAfter(true) );
    closeField.current?.click();
  };

  return (
    <Modal onBeforeProcess={setStateBefore} onAfterProcess={setStateAfter}>
      <C.Container>
        <div className='ctn-image'>
          <img src={product.image} alt="" />
        </div>
        <div className='ctn-desc'>
          <span className='m-prod-title'>{product.name}</span>
          <span className='m-prod-ing'>{product.ingredients}</span>
          <div className='m-prod-price'>
            <div className='m-prod-price--config'>
              <span onClick={() => handleClickConfig('-')}></span>
              <span>{qt}</span>
              <span onClick={() => handleClickConfig('+')}></span>
            </div>
            <span>R$ {formatMoeda( Number(product.price) * qt )}</span>
          </div>
        </div>
        <div className='ctn-button mt-2'>
          <button ref={closeField} className='btn btn-sm btn-outline-secondary me-2 close-modal'>Cancelar</button>
          <button className='btn btn-sm btn-success' onClick={addCart}>Adicionar ao carrinho</button>
        </div>
      </C.Container>
    </Modal>
  )
}

export default Comp;