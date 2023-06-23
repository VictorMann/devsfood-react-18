import * as C from './styles';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import { setCart } from '../../Redux/Reducers/Cart';
import { setOpen } from '../../Redux/Reducers/PedidoModal';
import { formatMoeda } from '../../Helpers';
import { isLogged } from '../../Helpers/auth';
import { CartItemType } from '../../Types';

let flatNotFirstEffect = true;

function Comp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stateAddCart = useAppSelector(state => state.ProductModal.stateAfter);
  const end = useAppSelector(state => state.Endereco.data);
  const cart = useAppSelector(state => state.Cart.data);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => { 
    if (flatNotFirstEffect) { flatNotFirstEffect = false; return }
    !stateAddCart && setActive(true);
  }, [stateAddCart]);

  const fnPlusAndMinus = (index: number, oper: '+'|'-') => {
    let xCart: CartItemType[] = JSON.parse(JSON.stringify(cart));

    if (oper === '-') {
      if (xCart[index].qtd <= 1) xCart = xCart.filter((_:any, idx:number) => !(index === idx));
      else xCart[index].qtd -= 1;
    } 
    else xCart[index].qtd += 1;
    
    dispatch( setCart(xCart) );
  };

  const totalItens = (): number => cart.reduce((r, item) => item.qtd + r, 0);

  const totalPrice = (): number => cart.reduce((r, item) => (item.qtd * Number(item.item.price)) + r, 0);
  
  const discount = 1;

  const handleClickOrder = () => {
    if (cart.length == 0) {
      alert('Adicione ao menos 1 item no carrinho.');
      return;
    }
    
    if (isLogged()) {
      dispatch( setOpen(true) );
    } else {
      navigate('/profile');
      return;
    }
  };

  return (
    <C.Container qtdItensCart={cart.length} className={active ? 'active rounded-top' : 'rounded-top'}>
      <div 
        className="cart-header d-flex align-items-center"
        onClick={() => setActive(!active)}>

        <span><img src="/images/cart.png" alt="" /></span>
        <span>Meu Carrinho ({totalItens()})</span>
        
      </div>
      <div className="cart-body">
        <div className='p-2'>
          <ul className='items-list list-unstyled'>
            {cart.map((item, index) => (
              <li key={index}>
                <div className='c-area-img'>
                  <figure>
                    <img src={item.item.image} alt="" />
                  </figure>
                  <div>
                    <span>{item.item.name}</span>
                    <span>R$ {formatMoeda(Number(item.item.price))}</span>
                  </div>
                </div>
                <div className='c-area-config'>
                  <span className='minus' onClick={() => fnPlusAndMinus(index, '-')}></span>
                  <span>{item.qtd}</span>
                  <span className='plus' onClick={() => fnPlusAndMinus(index, '+')}></span>
                </div>
              </li>
            ))}
          </ul>
          
          {end && end.cep &&
            <div className="area-entrega">
              <h5>Entrega</h5>
              <div className='area-entrega--body'>
                <div className='info-end'>
                  {/* <span>Minha Casa</span> */}
                  <span>{end.endereco}, {end.numero}</span>
                  <span>{end.complemento}</span>
                  <span>{end.cidade}, {end.uf}</span>
                </div>
                <span className='edit-end'></span>
              </div>
            </div>          
          }

          <div className='discount-coupon'>
            <h5>Cupom de Desconto</h5>
            <input 
              type="text" 
              className='form-control form-control-sm' />
          </div>

          <ul className="area-amount list-unstyled mt-2">
            <li className='d-flex justify-content-between'>
              <span>Desconto</span>
              <span>R$ {formatMoeda( discount )}</span>
            </li>
            <li className='d-flex justify-content-between'>
              <span>Taxa de entrega</span>
              <span>R$ 0,00</span>
            </li>
            <li className='d-flex justify-content-between'>
              <span>Total</span>
              <span>R$ {formatMoeda( totalPrice() - discount )}</span>
            </li>
          </ul>

          <button 
            className='btn-order w-100'
            onClick={handleClickOrder}>
              Finalizar Compra
          </button>


        </div>

      </div>
    </C.Container>
  )
}

export default Comp;