import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Template, PageBody } from './Components';

import Menu from './Components/Partials/Menu';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Cart from './Components/Cart';
import Routes from './Routes';

import ModalProduct from './Components/ModalProduct';
import ModalLogin from './Components/ModalLogin';
import ModalRegister from './Components/ModalRegister';
import ModalEndereco from './Components/ModalEndereco';
import ModalPedido from './Components/ModalPedido';
import { useAppSelector } from './Redux/hooks/useAppSelector';
import { isLogged } from './Helpers/auth';
import { api } from './Api';
import { setUser } from './Redux/Reducers/User';
import { setEndereco } from './Redux/Reducers/Endereco';

function App() {
  const dispatch = useDispatch();
  const openedProductModal = useAppSelector(state => state.ProductModal.opened);
  const openedLoginModal = useAppSelector(state => state.LoginModal.opened);
  const openedRegisterModal = useAppSelector(state => state.RegisterModal.opened);
  const openedEndModal = useAppSelector(state => state.EndModal.opened);
  const openedModalPedido = useAppSelector(state => state.PedidoModal.opened);
  const user = useAppSelector(state => state.User.data);

  useEffect(() => {
    if (isLogged() && !user.email) {
      (async () => {
        const resp = await api.user();
        if (resp.error) alert(resp.error);
        else {
          dispatch( setUser(resp.user) );
          dispatch( setEndereco(resp.end) );
        }
      })()
    }
  },[]);

  return (
    <BrowserRouter>
      <>
        <Template>
          <Menu />
          <PageBody>
            <Header />
            <Routes />
            <Footer />
            <Cart />
          </PageBody>
        </Template>

        {openedProductModal && <ModalProduct />}
        {openedLoginModal && <ModalLogin />}
        {openedRegisterModal && <ModalRegister />}
        {openedEndModal && <ModalEndereco />}
        {openedModalPedido && <ModalPedido />}
      </>
    </BrowserRouter>
  );
}

export default App;
