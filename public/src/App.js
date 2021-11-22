import React from 'react';
import { Routes , Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import {Homepage, Navbar, Books, Sweets, Badges, Clothes, Account} from './components';
import 'antd/dist/antd.css';

import './App.css';

function App() {


  return (
    <div className="App">
      <div className="navbar">
        <Navbar></Navbar>
      </div>

      <div className="main">
      <Layout>
        <div className="routes">
          <Routes >
            <Route path = '/' element={<Homepage/>}></Route>
            <Route path = '/books' element={<Books/>}></Route>
            <Route path = '/sweets' element={<Sweets/>}></Route>
            <Route path = '/badges' element={<Badges/>}></Route>
            <Route path = '/clothes' element={<Clothes/>}></Route>
            <Route path = '/account' element={<Account/>}></Route>
          </Routes >
        </div>
      </Layout>
      </div>
    </div>
  );
}

export default App;