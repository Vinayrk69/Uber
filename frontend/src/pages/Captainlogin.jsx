import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Captainlogin=() => {
const[email,setEmail]=useState('');
const[password,setPassword]=useState('');
const [Captaindata,setCaptaindata]=useState({});
const submitHandler=(e)=>{

    e.preventDefault();
    setCaptaindata({
        email:email,
        password:password
    })
    console.log(userData);
    
    setEmail('')
    setPassword('')
}

    return (
       <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-4'src="https://media.designrush.com/inspiration_images/651560/conversions/1200x600wa-mobile.jpg" />

            <form onSubmit={(e)=>
                submitHandler(e)} >
                <h3 className='text-lg font-medium mb-2'>What's your email</h3> 
                <input required  
                value={email} 
                onChange={(e)=>
                    setEmail(e.target.value)}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
                type="email" placeholder='abc@gmail.com'/>
                <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                <input required 
                onChange={(e)=>
                    setPassword(e.target.value)}
                className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
                type="password" placeholder='password'/>
                <button
                className='bg-[#111] text-white  font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base '>
                    Login</button>
                
            </form>
            <p className='text-center'>Join the fleet?<Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
            </div>
            <div>
                <Link to="/login" className= 'bg-[#d5622d] flex items-center justify-center text-white  font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default Captainlogin;