import * as C from './styles';
import { Link, useLocation } from 'react-router-dom';

import { Tooltip } from '../../Tooltip';

function Comp() {
  const loc = useLocation();

  return (
    <C.Container className='nav-main d-flex align-items-center'>
      <ul className='list-unstyled'>
        <li>
          <Tooltip title='Loja'>
            <Link to="/" className={loc.pathname === '/' ? 'active' : ''}>
              <img src="/images/store.png" alt="" />
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='Pedidos'>
            <Link to="/order" className={loc.pathname === '/order' ? 'active' : ''}>
              <img src="/images/order.png" alt="" />
            </Link>
          </Tooltip>
        </li>
        <li>
          <Tooltip title='Minha Conta'>
            <Link to="/profile" className={loc.pathname === '/profile' ? 'active' : ''}>
              <img src="/images/profile.png" alt="" />
            </Link>
          </Tooltip>
        </li>
      </ul>
    </C.Container>
  )
}

export default Comp;