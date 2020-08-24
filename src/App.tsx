import React from 'react';
import { Header } from './components';
import { Route } from 'react-router-dom';
import { Home, Cart } from './pages';

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path='/' component={Home}/>
      <Route exact path='/cart' component={Cart}/>
    </div>
  );
}

export default App;
