// eslint-disable-next-line no-unused-vars
import React from 'react';
import './App.css';
import Header from './headers/Header';
import Footer from './footers/Footer';

import Home from './home/Home';

function App() {
  return (
    <div className="App">
     <Header/>
     <Home/>
     <Footer/>
    </div>
  );
}

export default App;
