import React,{useState,useEffect} from 'react'
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import { useLocation,useNavigate } from 'react-router-dom';

const Login = () => {
      const location=useLocation()
      const Navigate=useNavigate()

      const message=location.state?.message
      const [menu,setMenu]=useState(false);
      const [user,setUser]=useState({
        email:"",
        pw:""
      })
      const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
      }
          const MenuSwitch=(data)=>{
            setMenu(!menu)
    
          }
          const submitData=()=>{
                fetch(`${BASE_URL}/user/login`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify(user)
                }).then(res=>res.json()).then(res=>{
                    if(res.user){
                        localStorage.setItem("user_info",JSON.stringify(res.user))
                        toastr.success("Login with success !!","Success",{positionClass:"toast-bottom-right"})
                        setUser({
                          email:"",
                          password:""
                        })
                        Navigate('/')
                    }
                            else if(res.error){
                        toastr.error(res.error,"Error",{positionClass:"toast-bottom-right"})
                    }else{
                        console.log(res)
                    }


                }).catch(err=>{
                    console.log(err)
                })
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
              {(message=="User Form") && (
                <h3 className='fw-bolder'>New User</h3>
              )}
              {(message!="User Form") && (
                <h3 className='fw-bolder'>Login Page</h3>
              )}

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
                  <div className="form-label">Email</div>
                  <input type="text" name="email" id="" value={user.email} onChange={handleChange} className="form-control" />
                </div>
                  <div className="row col-md mt-2">
                  <div className="form-label">Password</div>
                  <input type="text" name="pw"  id="" value={user.password} onChange={handleChange} className="form-control" />
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
    </>  )
}

export default Login