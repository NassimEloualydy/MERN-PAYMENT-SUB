import React,{useState,useEffect} from 'react'
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import { useLocation,useNavigate } from 'react-router-dom';
import Breadcrump from './Breadcrump';


const MemeberShip = () => {
    const [data,setData]=useState([])
        const [searchData,setSearchData]=useState({
Student:"",
Cours:"",
State:"",
Grad:"",
start_date:"",
end_date:"",
attendance:"",
payment_state:"",
        })
        const handleChange=(e)=>{
            setSearchData({...searchData,[e.target.name]:e.target.value})
        }
        const getData=()=>{
            const {token}=JSON.parse(localStorage.getItem("user_info"))
            fetch(`${BASE_URL}/memebership/getData`,{
                method:"POST",
                headers:{
                    "Accept":"application/json",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify(searchData)
            }).then(res=>res.json()).then(res=>{
                if(res.error){
                    console.log(res.error)
                }
                if(res.data){
                    setData(res.data)
                }
            }).catch(err=>{
                console.log(err)
            })
        }
        useEffect(()=>{
            getData()
        },[])
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
                    <div className="container">
                        <form action="">
                            <div className="row text-center">
                                <div className="col-md mt-2"><input type="text" name="Student" value={searchData.Student} onChange={handleChange} placeholder='Student' className="form-control" /></div>
                                <div className="col-md mt-2"><input type="text" name="Cours" value={searchData.Cours} onChange={handleChange} placeholder='Cours' className="form-control" /></div>
                                <div className="col-md mt-2"><input type="text" name="State" value={searchData.State} onChange={handleChange} placeholder='State' className="form-control" /></div>
                                <div className="col-md mt-2"><input type="text" name="Grad" value={searchData.Grad} onChange={handleChange} placeholder='Grad' className="form-control" /></div>
                            </div>
                            <div className="row text-center">
                                <div className="col-md mt-2"><input type="date" name="start_date" value={searchData.start_date} onChange={handleChange} placeholder='Start Date' className="form-control" /></div>
                                <div className="col-md mt-2"><input type="date" name="end_date" value={searchData.end_date} onChange={handleChange} placeholder='End Date' className="form-control" /></div>
                                <div className="col-md mt-2"><input type="text" name="attendance" value={searchData.attendance} onChange={handleChange} placeholder='Attendance' className="form-control" /></div>
                                <div className="col-md mt-2"><input type="text" name="payment_state" value={searchData.payment_state} onChange={handleChange} placeholder='Payment State' className="form-control" /></div>
                            </div>
                            <div className="row text-center">
                                <div className="col-md mt-2"><input type="button" onClick={getData} value="Search" className="btn btn-dark w-100" /></div>
                            </div>
                        </form>
                    </div>
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