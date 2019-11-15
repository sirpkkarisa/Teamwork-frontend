import React from 'react';
import logo from '../images/logo.png';
import './Header.css';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  render() {
    return (
      <div className="Header">
        <nav>
          <div className="Title">
            <h1>Teamwork</h1>
            <img src={logo} title="Logo" />
          </div>
          <div className="Navigation">
            <div>
              <span><a href="#">Home</a></span>
              <span><a href="#">Articles</a></span>
              <span>
                <a href="#">GIFs</a>
                {' '}
              </span>
            </div>
            <i className="fa fa-user fa-3x" title="New User" />
          </div>
        </nav>
      </div>
    );
  }
}
export default Header;
