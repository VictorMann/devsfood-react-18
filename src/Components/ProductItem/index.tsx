import * as C from './styles';

import { ProductType } from '../../Types';
import { formatMoeda } from '../../Helpers';

type Props = {
  item: ProductType;
  onClick?: (item: ProductType) => void;
};

function Comp({ item, onClick }: Props) {
  return (
    <C.Container className='d-flex rounded p-2' onClick={() => onClick && onClick(item)}>
      <figure>
        <img src={item.image} alt="" />
      </figure>
      <div className='figure-desc'>
        <span className='fig-name'>{item.name}</span>
        <span className='fig-price'>R$ {formatMoeda(Number(item.price))}</span>
        <span className='fig-ing'>{item.ingredients}</span>
      </div>
    </C.Container>
  )
}

export default Comp;