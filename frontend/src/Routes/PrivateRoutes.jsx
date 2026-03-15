import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'
const isAuth=()=>{
    const user=JSON.parse(localStorage.getItem("user_info"))
    if(user)
        return user
    return false
}
const PrivateRoutes = () => {
    return isAuth()?<Outlet/>:<Navigate to='/'/>
}


export default PrivateRoutes