import React from 'react'
import {BrowserRouter as Router, Route,Routes} from 'react-router-dom'
import SignIn from '../components/signIn'
import Login from '../components/Login'
const RouteSystem = () => {
  return (
    <div>
        <Router>
            <>
                <Routes>
                    <Route path="/signIn" element={<SignIn/>} />
                    <Route path="/login" element={<Login/>} />
                </Routes>
            </>
        </Router>
    </div>
  )
}

export default RouteSystem