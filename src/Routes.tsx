import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound';

export default () => {
  return (
    <Routes>
      <Route path='/' element={ <Home /> } />
      <Route path='/profile' element={ <Profile /> } />
      <Route path='*' element={ <NotFound /> } />
    </Routes>
  )
};