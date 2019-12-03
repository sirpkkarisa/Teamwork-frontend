import React from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Header from './headers/Header';
import Footer from './footers/Footer';
import Home from  './home/Home';
import Form from './create-user/Form';
import Articles from './articles/Articles';
import Gifs from  './gifs/Gifs'


//The main comonent containing the structure of the page
class MainComponent extends React.Component {
  render(){
    return (
      <div>
      <Header />
        <Router>
          <Route exact path='/' render={
            ()=>(
              <Home/>
            )
          }/>
          <Route exact path='/create-user' render={
            ()=>(
              <Form />
            )
          }/>
          <Route exact path='/articles' component={Articles}/>
          <Route exact path='/gifs' component={Gifs}/>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default MainComponent;
