import React from 'react';
import {Route} from 'react-router-dom';

import Home from './pages/home';
import Products from './pages/products';
import Cart from './pages/cart';
import Header from './pages/header';
import './App.css';


class App extends React.Component {
  render() {
    return(
      <div>
        <Header/>
        <Route exact path="/" component={Home} title="클래스101"/>
        <Route path="/products" component={Products} title="상품 목록" />
        <Route path="/cart" component={Cart} title="장바구니" />
      </div>
    );
  }
}

export default App;
