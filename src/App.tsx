import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Template, PageBody } from './Components';

import Menu from './Components/Partials/Menu';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Cart from './Components/Cart';
import Routes from './Routes';

import ModalProduct from './Components/ModalProduct';
import { useAppSelector } from './Redux/hooks/useAppSelector';

function App() {
  const openedModalProduct = useAppSelector(state => state.ProductModal.opened);

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

        {openedModalProduct && <ModalProduct />}
      </>
    </BrowserRouter>
  );
}

export default App;
