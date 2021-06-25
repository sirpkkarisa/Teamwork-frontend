import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
import { Redirect } from 'react-router-dom';


class Header extends React.Component {
  toHome=(e)=>{
    e.preventDefault();
    const currentUrl = window.location.href.split('/');
    const cfm=window.confirm('You want to logout?')
    if((currentUrl[3]==='articles' || currentUrl[3]==='gifs') && cfm===true){
      return localStorage.removeItem('token')
      }
    }
   onClick=()=>{
    //  const username=prompt('Username');
    //  const password = prompt(' password')
    let pass='';
    
    document.write(
      `
      <script>
      const ck=()=>{
        pass=document.getElementById('pass')
        alert(pass.value)
      }
      </script>
      <form><input type="text" placeholder="User Name" id="pass"/><br/>
      <input type="password" placeholder="Password"/><br/>
      <button onclick="ck()">Login</button>
      </form>
      `
    )
    console.log(pass.value)
      fetch('http://localhost:7000/articles')
      .then(
        (res)=>{
          return res.json();
        }
      ).then(
        (data)=>{
          console.log(data);
        }
      ).catch(
        (error)=>{
          console.log(error)
        }
      )
  }
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
              <span onClick={this.toHome}><a href="/" className='home' >Home</a></span>
              <span><a href="/articles">Articles</a></span>
              <span>
                <a href="/gifs">GIFs</a>
                {' '}
              </span>
            </div>
            <i className="fa fa-user fa-3x" title="New User" onClick={this.onClick}/>
          </div>
        </nav>
        <div className='Modal'>
        </div>
      </div>
    );
  }
}
export default Header;
