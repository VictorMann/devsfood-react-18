import { useEffect, useState } from 'react';
import * as C from './styles';
import { useAppSelector } from '../../Redux/hooks/useAppSelector';

let flatNotFirstEffect = true;

function Comp() {
  const stateAddCart = useAppSelector(state => state.ProductModal.stateAfter);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => { 
    if (flatNotFirstEffect) { flatNotFirstEffect = false; return }
    !stateAddCart && setActive(true);
   }, [stateAddCart]);

  return (
    <C.Container className={active ? 'active rounded-top' : 'rounded-top'}>
      <div 
        className="cart-header d-flex align-items-center"
        onClick={() => setActive(!active)}>

        <span><img src="/images/cart.png" alt="" /></span>
        <span>Meu Carrinho (x)</span>
        
      </div>
      <div className="cart-body">
        <div className='p-3'>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. It was popularised in the 1960s with the release of 
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop 
        publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
      </div>
    </C.Container>
  )
}

export default Comp;