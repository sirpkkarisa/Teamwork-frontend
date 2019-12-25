import React from 'react';
import './Home.css';
import background from '../../images/background.gif';
import {Redirect} from 'react-router-dom';

class Home extends React.Component{
    state={
        mailIput:'',
        passInput:''
    }
    isAuthenticated=()=>{
        const token = localStorage.getItem('token');
        return token && token.length > 20;
    };
    validateEmail=(mail)=>{
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (mail.match(pattern) !== null) {
                return true;
            }
            return false;
    }
    passwordIsWeak=(pass)=>{
        const pattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})');
        if (pass.match(pattern)) {
            return true;
        }
        return false;
    }
    onLogin=(e)=>{
        e.preventDefault();
        const email=this.email.value;
        const password=this.password.value;
        const Email=document.getElementsByClassName('Email');
        const Password=document.getElementsByClassName('Password');

        this.email.value='';
        this.password.value='';
        if (email.length <1 || password < 1) {
            Password[0].classList.add('error-p')
             return Email[0].classList.add('error-e');
        }
        if (!this.validateEmail(email) || !this.passwordIsWeak(password)) {
            Password[0].classList.add('error-p')
            return Email[0].classList.add('error-e');
        }
        fetch(
            'https://quiet-plains-42182.herokuapp.com/auth/signin/',
            {
                method:'POST',
                headers:{
                    'Accept':'application/json,*/*',
                    'Content-type':'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            }
        ).then(
            (res)=>res.json()
        ).then(
            (res)=>{
                if (res.error ==='Unauthorized') {
                    return alert('Incorrect cridentials')
                }
                if (res.error) {
                    return alert('Uncaugt ERROR')
                }
                localStorage.setItem('token',res.data.token);
                localStorage.setItem('id',res.data.employeeId);
                // this.setState();
                Password[0].classList.add('success-p')
                return Email[0].classList.add('success-e');
                this.setState()
            }
        ).catch(
            (error)=>{
                console.log(error)
            }
        )
      }
      
    render(){
        const auth = this.isAuthenticated();
        return(
            <div>
                {
                    auth ? <Redirect to='/articles'/>:(
                        <div>
                        <div className='Background-Upper'>
                    <img src={background} className='backround'/>
                    <form className='Form'>
                        <p>
                            <label>Email Address:</label>
                            <input type='text' placeholder='Email Address' ref={email=>this.email=email} className='Email'/>
                        </p>
                        <p>
                            <label>Password:</label>
                            <input type='password' placeholder='Password' ref={password=>this.password=password} className='Password'/>
                        </p>
                        <p>
                            <input type='submit' value='Sign In' onClick={this.onLogin} className='Sign-In'/>
                        </p>
                    </form>
                </div>
                <div className='Lower'>
                    <div className='First-Col'>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui. Quisque nec mauris sit amet elit iaculis pretium sit amet quis magna. Aenean velit odio, elementum in tempus ut, vehicula eu diam. Pellentesque rhoncus aliquam mattis. Ut vulputate eros sed felis sodales nec vulputate justo hendrerit. Vivamus varius pretium ligula, a aliquam odio euismod sit amet. Quisque laoreet sem sit amet orci ullamcorper at ultricies metus viverra.
                         Pellentesque arcu mauris, malesuada quis ornare accumsan, blandit sed diam.
                        </p>
                        <div className='Thumbnail'>
                            <img src='https://image.shutterstock.com/display_pic_with_logo/176794450/1107376274/stock-photo-a-girl-selling-tomatoes-and-vegetables-in-a-typical-local-african-market-1107376274.jpg'/>
                            <img src='https://image.shutterstock.com/display_pic_with_logo/1666600/1072045493/stock-photo-successful-african-american-business-team-talking-about-strategy-at-office-1072045493.jpg'/>
                            <img src='https://image.shutterstock.com/display_pic_with_logo/2117717/579884275/stock-photo-diverse-business-people-meeting-partnership-579884275.jpg'/>
                            <img src='https://image.shutterstock.com/display_pic_with_logo/163108/1176387349/stock-photo-rugby-players-in-a-huddle-rubbing-their-feet-on-grass-rugby-team-showing-aggression-after-the-win-1176387349.jpg'/>
                        </div>
                    </div>
                    <div>
                        <div className='Second-Col'>
                           <div>
                           <h2>Motto</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </p>
                           </div>
                           <div>
                           <h2>Vission</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id.
                            </p>
                           </div>
                           <div>
                           <h2>Mission</h2>
                            <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui
                            </p>
                           </div>
                        </div>
                    </div>
                    <div className='Third-Col'>
                        <div className='Note'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. 
                         <br/>
                         <em>--John Doe</em>
                         <br/>
                         <em>--2005-10-10</em>
                        </div>
                        <div className='Under-Note'>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui
                        </div>
                    </div>
                </div>
                        </div>
                        )
                }
            </div>
        );
    }
}
export default Home;