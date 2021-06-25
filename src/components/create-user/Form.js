import React from 'react';
import './Form.css';

class Form extends React.Component{
    render(){
        return(
            <div>
                <div className='Container'>
                <form>
                    <p>
                        <label>First Name</label>
                        <input type='text' placeholder='First Name' className='Input'/>
                    </p>
                    <p>
                        <label>Last Name</label>
                        <input type='text' placeholder='Last Name' className='Input'/>
                    </p>
                    <p className='Email' >
                        <label>Email</label>
                        <input type='text' placeholder='Email' className='Input' style={emailStyle}/>
                    </p>
                    <p>
                        <label>Password</label>
                        <input type='password' placeholder='Password' className='Input'/>
                    </p>
                    <p>
                        <label>Gender</label>
                        <input type='radio' value='male' name='gender' className='Radio'/> Male
                        <input type='radio' value='female' name='gender'/>female
                    </p>
                    <p>
                        <label>Address</label>
                        <input type='text' placeholder='Address' className='Input'/>
                    </p>
                    <p>
                        <label>Job Role</label>
                        <select>
                            <option>Accountant</option>
                            <option>Manager</option>
                            <option>Procurement Officer</option>
                            <option>ICT manager</option>
                        </select>
                    </p>
                    <p>
                        <label>Department</label>
                        <select>
                            <option>Finance</option>
                            <option>ICT</option>
                            <option> Procurement</option>
                            <option>Marketing</option>
                        </select>
                    </p>
                    <p>
                        <input type='submit' value='Register' className='Input'/>
                    </p>
                    
                </form>
            </div>
            </div>
        );
    }
}
const emailStyle={
    marginLeft:'3.5em',
}
export default Form;