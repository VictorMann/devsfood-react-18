import * as C from './styles';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';
import { setCart } from '../../Redux/Reducers/Cart';
import { formatMoeda } from '../../Helpers';
import { CartItemType } from '../../Types';

let flatNotFirstEffect = true;

function Comp() {
  const dispatch = useDispatch();
  const stateAddCart = useAppSelector(state => state.ProductModal.stateAfter);
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

  const total = (): number => cart.reduce((r, item) => item.qtd + r, 0);
   

  return (
    <C.Container className={active ? 'active rounded-top' : 'rounded-top'}>
      <div 
        className="cart-header d-flex align-items-center"
        onClick={() => setActive(!active)}>

        <span><img src="/images/cart.png" alt="" /></span>
        <span>Meu Carrinho ({total()})</span>
        
      </div>
      <div className="cart-body">
        <div className='p-1'>
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
        </div>
      </div>
    </C.Container>
  )
}

export default Comp;