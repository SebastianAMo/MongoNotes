import {Route,Routes } from 'react-router-dom';
import { useMemo } from 'react';

import Navebar from './components/Navebar.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Main from './containers/Main.jsx'

import useToken from './components/useToken.js';
import { TokenContext } from './TokenContext';


function App() {
  const { token, removeToken, setToken } = useToken();

  const value = useMemo(() => ({ token, setToken, removeToken }), [token, setToken, removeToken]);

  return (
    <TokenContext.Provider value={value}>
    <Navebar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/main' element={<Main/>}/>

    </Routes>
  </TokenContext.Provider>
  );
}

export default App;
