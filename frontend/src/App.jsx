import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import UserSignup from './pages/UserSignup.jsx'
import UserLogin from './pages/UserLogin.jsx';
import Captainlogin from './pages/Captainlogin.jsx';
import CaptainSignup from './pages/CaptainSignup.jsx';
const App = () => {
    return (
        <div>
            <Routes>   
                <Route path='/' element={<Home/>}/>
                <Route path='/signup' element={<UserSignup/>}/>
                <Route path='/login' element={<UserLogin/>}/>
                <Route path='/captain-login' element={<Captainlogin/>}/>
                <Route path='/captain-signup' element={<CaptainSignup/>}/>
            </Routes>
        </div>
    )
    }
export default App;