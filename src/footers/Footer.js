import React from 'react';
import logo from '../images/logo.png';
import './Footer.css';

// eslint-disable-next-line react/prefer-stateless-function
class Footer extends React.Component {
  render() {
    return (
      <div >
        <footer>
            Developed by:
            <i className='fa fa-copyright'>S.P.K.Karisa Teq</i>
            <i className='fa fa-phone'>+254774144413</i>
            <i className='fa fa-envelope'>sirpkkarisa001@gmail.com</i>
        </footer>
      </div>
    );
  }
}
export default Footer;
