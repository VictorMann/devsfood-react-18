import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Template, PageBody } from './Components';

import Menu from './Components/Partials/Menu';
import Header from './Components/Partials/Header';
import Footer from './Components/Partials/Footer';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <Template>
        <Menu />
        <PageBody>
          <Header />
          <Routes />
          <Footer />
        </PageBody>
      </Template>
    </BrowserRouter>
  );
}

export default App;
