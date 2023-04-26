import * as C from './styles';

import { ProductType } from '../../Types';

type Props = {
  item: ProductType;
};

function Comp({ item }: Props) {
  return (
    <C.Container className='d-flex rounded p-2'>
      <figure>
        <img src={item.image} alt="" />
      </figure>
      <div className='figure-desc'>
        <span className='fig-name'>{item.name}</span>
        <span className='fig-price'>R$ {item.price}</span>
        <span className='fig-ing'>{item.ingredients}</span>
      </div>
    </C.Container>
  )
}

export default Comp;