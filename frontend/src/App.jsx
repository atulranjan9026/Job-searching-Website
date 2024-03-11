import React from 'react'
import { Routes,Route } from "react-router-dom"
import  HomePage from './pages/HomePage';
import Login  from './Auth/Login';
import Signup from './Auth/Signup';
import Result from './pages/result';
import Seeker from './seeker/seeker';
import Main from './seeker/main';
import SignupSeeker from './seeker/signupSeeker';
import LoginSeeker from './seeker/loginSeeker';

function App  () {
  return (
    <Routes>
      <Route>
        <Route path='/' element={<Main />}></Route>           
        <Route path='/HomePage' element={<HomePage />}/>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>           
        <Route path='/result' element={<Result />}></Route>           
        <Route path='/seeker' element={<Seeker />}></Route>           
        <Route path='/signupSeeker' element={<SignupSeeker />}></Route>           
        <Route path='/loginSeeker' element={<LoginSeeker />}></Route>           
      </Route>
    </Routes>
  )
}

export default App