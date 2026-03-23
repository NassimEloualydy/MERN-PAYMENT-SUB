import React from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import SignIn from '../components/signIn'
import Login from '../components/Login'
import PrivateRoutes from './PrivateRoutes'
import Users from '../components/Users'
import Home from '../components/Home'
import Cours from '../components/Cours'
import CoursForm from '../components/CoursForm'
const RouteSystem = () => {
  return (
    <div>
        <Router>
            <>
                <Routes>
                    <Route path="/signIn" element={<SignIn/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route element={<PrivateRoutes/>}>
                        <Route path='/users' element={<Users/>}/>
                        <Route path='/' element={<Home/>}/>
                        <Route path="/cours" element={<Cours/>}/>
                        <Route path="/CoursForm" element={<CoursForm/>}/>
    </Route>                </Routes>
            </>
        </Router>
    </div>
  )
}

export default RouteSystem