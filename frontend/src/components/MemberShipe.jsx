import React,{useState,useEffect} from 'react'
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import { useLocation,useNavigate } from 'react-router-dom';
import Breadcrump from './Breadcrump';


const MemeberShip = () => {
      const pathPages=[{name:"Home",urlPath:"/"}]

      const location=useLocation()
      const Navigate=useNavigate()
      const loadNewForm=()=>{
        Navigate("/MemberShipForm",{state:{message:"New Data"}})
      }
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
                <h3 className='fw-bolder'>Memeber Ship</h3>

            </div>
        </div>

    </div>
       <Breadcrump currentPage="Memeber Ship" pathPages={pathPages} />
    <div className="container">
      <div className="row">
        <div className="col-md">
        <input type="button" value="New" onClick={loadNewForm} className="btn btn-dark" />
        </div>
      </div>
    </div>
    </>  )
}

export default MemeberShip