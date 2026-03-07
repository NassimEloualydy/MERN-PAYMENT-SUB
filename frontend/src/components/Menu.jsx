import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import toastr from 'toastr';

const Menu = () => {
    const navigate=useNavigate()
    const NavigateUrl=(data)=>{
      if(data=="/Log Out"){
        localStorage.clear()
        toastr.success("Log Out with success !!","Success",{positionClass:"toast-bottom-right"})
        setUser({})
        navigate('/')
      }else{
        navigate(data);
        
      }
    }
    const [user,setUser]=useState({})
    useEffect(()=>{
      const user=JSON.parse(localStorage.getItem("user"));
      if(user)
        setUser(user)
      
    },[])
  return (
    <>
     {user.first_name && (
      <>
         <h3 className='fw-bolder'>{user.first_name} {user.last_name}</h3>  
      </>
     )}
     {!user.first_name && (
      <>
         <h3 className='fw-bolder'>Menu</h3>  
      </>
     )}


{!user.first_name && (
      <>
         <div onClick={NavigateUrl.bind(this,"/signIn")} className="itemMenu">Sign In</div>
         <div onClick={NavigateUrl.bind(this,"/login")} className="itemMenu">Log In</div>
      </>
     )}
{user.first_name && (
      <>
     <div onClick={NavigateUrl.bind(this,"/products")} className="itemMenu">Products</div>     
     <div onClick={NavigateUrl.bind(this,"/your_account")} className="itemMenu">Your Account</div>     
     <div onClick={NavigateUrl.bind(this,"/Log Out")} className="itemMenu">Log Out</div>
      </>
     )}

    </>
  )
}

export default Menu
