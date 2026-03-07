import React,{useState,useEffect} from 'react'
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import {PayPalButtons,PayPalScriptProvider,usePayPalScriptReducer} from '@paypal/react-paypal-js'
const SignIn = () => {
const base="https://api-m.sandbox.paypal.com"
const CLIENT_ID="AZgVyHJWiHKBxCakivCo6f_RAYN_NLYF7Xdy56asejPJNSbwu8Kbi4xeZjhXIil8P3EfvAtuK2rih416"
const SECRETE_KEY="EE2tqL0icul0olXYWpjFWBR0gM1JuuuiT1MebjqFM3IT67IMaMps2WAMaRWfrQW0bQir_g7P93_brHUR"

  const [formData,setFormData]=useState(new FormData());
  const [user,setUser]=useState({
    first_name:"",
    last_name:"",
    email:"",
    password:"",
    phone:""
  })
  
  const handlechange=(e)=>{
    const value=e.target.name=='photo'?e.target.files[0]:e.target.value
    setUser({...user,[e.target.name]:value})
    formData.set(e.target.name,value);
  }
  const [menu,setMenu]=useState(false);

      const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
    const handleCreateOrder=()=>{

      return "7F7067360L1839120"
    }
    const ApproveCreateOrder=()=>{

    }
  const submitData=()=>{
    fetch(`${BASE_URL}/user/signIng`,{
      method:"POST",
      headers:{
        'Accept':'application/json',

      },body:formData
    }).then(res=>res.json()).then(res=>{
      if(res.err){
        toastr.error(res.err,"Error",{positionClass:"toast-bottom-right"})
      }else if (res.message){
        toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
        setFormData(new FormData())
        setUser({ first_name:"",
    last_name:"",
    email:"",
    password:"",
    phone:""})


      }else{
        console.log(res)
      }
    }).catch(err=>console.log(err))
  }

  return (
    <>

       <div className={menu?"menu":"hide_menu"}>
              <span onClick={MenuSwitch.bind(this,false)} className="close_menu">
              {/* <ion-icon name="close-outline"></ion-icon> */}
              </span>
              <br />
              <br />
              <Menu/>
              <span className="iconmenu" onClick={MenuSwitch.bind(this,true)}>

<ion-icon name="menu-outline"></ion-icon>
    </span>

        </div>  
                <div className="headerSearchInfo">
        <br />
        <br />
        <div className="container border border-white text-light pb-3 rounded-3">
            <div className="p-2">
                <h3 className='fw-bolder'>Sign In</h3>

            </div>
        </div>

    </div>
    <section className="m-3">
      <div className="container">
        <div className="row">
          <div className="card col-md-12 col-lg-6 mx-auto">
            <div className="card-body">
              {/* <div className="card-title h4 fw-bolder">Form</div> */}
              {/* <hr /> */}
              <form action="">
                <div className="row col-md mt-2">
                  <div className="form-label">Photo</div>
                  <input type="file" name="photo" onChange={handlechange} id="" className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">First Name</div>
                  <input type="text" name="first_name" value={user.first_name} onChange={handlechange} id="" className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Last Name</div>
                  <input type="text" name="last_name" id="" value={user.last_name} onChange={handlechange} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Phone</div>
                  <input type="text" name="phone" id="" value={user.phone} onChange={handlechange} className="form-control" />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Email</div>
                  <input type="text" name="email" id="" value={user.email} onChange={handlechange} className="form-control" />
                </div>
                  <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="password"  id="" value={user.password} onChange={handlechange} className="form-control" />
                </div>  
                  <div className="row mt-2"><input type="button" onClick={submitData} value="Submit" className="btn btn-dark" /></div>
                <div className="row mt-2">
                  {/* <PayPalScriptProvider options={{clientId:CLIENT_ID}}>
            
              <PayPalButtons  
               createOrder={handleCreateOrder}
               onApprove={ApproveCreateOrder}
              />
            </PayPalScriptProvider> */}
                </div>

              </form>
            </div>
          </div>
        
        </div>
      </div>
    </section>
    </>
  )
}

export default SignIn