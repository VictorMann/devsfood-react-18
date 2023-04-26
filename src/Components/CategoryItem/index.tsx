import * as C from './styles';
import { Link, useSearchParams } from 'react-router-dom';
import { CategoryType } from '../../Types';

import { Tooltip } from '../Tooltip';

type Props = {
  item: CategoryType;
  active?: number;
};

function Comp({ item, active }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  let strClass = item.id === 0 ? 'cat-all ' : '';

  const makeURL = (id: number) => {
    if (id === 0) searchParams.delete('cat');
    else searchParams.set('cat', String(id));
    return '?' + searchParams.toString();
  };

  return (
    <C.Container>
      <Tooltip title={item.name as string} dir='top'>
        <Link 
          to={makeURL(Number(item.id))}
          className={item.id === active ? (strClass + 'active') : strClass}
          style={{ backgroundImage: `url(${item.image})` }}>

            {item.name}

        </Link>
      </Tooltip>
    </C.Container>
  )
}

export default Comp;