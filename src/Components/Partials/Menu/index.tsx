import * as C from './styles';
import { Link, useLocation } from 'react-router-dom';

function Comp() {
  const loc = useLocation();

  return (
    <C.Container className='nav-main d-flex align-items-center'>
      <ul className='list-unstyled'>
        <li>
          <Link to="/" className={loc.pathname === '/' ? 'active' : ''}>
            <img src="/images/store.png" alt="" />
          </Link>
        </li>
        <li>
          <Link to="/order" className={loc.pathname === '/order' ? 'active' : ''}>
            <img src="/images/order.png" alt="" />
          </Link>
        </li>
        <li>
          <Link to="/profile" className={loc.pathname === '/profile' ? 'active' : ''}>
            <img src="/images/profile.png" alt="" />
          </Link>
        </li>
      </ul>
    </C.Container>
  )
}

export default Comp;