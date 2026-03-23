import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import Breadcrump from './Breadcrump';
const Users = () => {
      const Navigate=useNavigate()
      const [users,setUsers]=useState([])
      const [menu,setMenu]=useState(false);
      const [userConnected,setUserConnected]=useState({})
      const [user,setUser]=useState({
        _id:"",
        first_name:"",
        last_name:"",
        
        email:"",
        phone:"",
        role:""
      })
  const pathPages=[{name:"Home",urlPath:"/"}]
const loadNewForm=()=>{
  Navigate("/signIn",{ state: { message: "User Form" } })
}
const deleteData=(data)=>{
  const {token}=JSON.parse(localStorage.getItem("user_info"))
  fetch(`${BASE_URL}/user/delete/${data}`,{
    method:"POST",
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json",
      "Authorization":`Bearer ${token}`
    }
  }).then(res=>res.json()).then(res=>{
    if(res.message){
      toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
      getData()
    }else if(res.err){
      toastr.error(res.err,"Error",{positionClass:"toast-bottom-right"})
      
    }else{
      console.log(res)
    }
  }).catch(err=>console.log(err))
}
const loadData=(data)=>{
  Navigate("/signIn",{ state: { message: "Update User",user:data} })

}
      const getData=()=>{
        fetch(`${BASE_URL}/user/getData`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(res=>res.json()).then(res=>{
            if(res.data)
                setUsers(res.data)
            else{
                console.log(res)
            }
        }).catch(err=>console.log(err))
      }
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
    useEffect(()=>{
         const {user}=JSON.parse(localStorage.getItem("user_info")) 
         setUserConnected(user)
         

        getData()
    },[])
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
                <h3 className='fw-bolder'>Users</h3>
 <div className="container">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="first_name" onChange={handleChange}  value={user.first_name}   placeholder='First Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="last_name" onChange={handleChange}  value={user.last_name}   placeholder='Last Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="email" onChange={handleChange}  value={user.email}   placeholder='Email' className="form-control" /></div>
                  
                </div>
               
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="role" onChange={handleChange} value={user.role}  placeholder='Role' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="phone" onChange={handleChange}  value={user.phone}  placeholder='Phone' className="form-control" /></div>
                </div>

                <div className="row text-center">
                    <div className="col-md mt-2">
                        <input type="button" value="Search" onClick={getData}  className="btn btn-dark w-100" />
                    </div>
                </div>
            </form>
        </div>
            </div>
        </div>

    </div>
<Breadcrump currentPage="Users" pathPages={pathPages} />
{JSON.stringify(userConnected)}
    <div className="container">
      <div className="row">
        <div className="col-md">
        <input type="button" value="New" onClick={loadNewForm} className="btn btn-dark" />
        </div>
      </div>
    </div>
    <section className="m-3">
      <div className="container">
        <div className="row">
            {users.map((u,key)=>(
            <div key={key} className="col-md-6 col-lg-3">
                    <div className="card" style={{position:"relative"}}>
                  <span style={{position: "absolute", bottom: "2px",right: "5px",paddingBottom:"0px"}} onClick={deleteData.bind(this,u._id)} className="Icon Icon_delete">
                            <ion-icon   name="trash-outline"></ion-icon>
                    </span>
                    <span style={{position: "absolute", bottom: "2px",right: "35px",paddingBottom:"0px"}} data-bs-toggle="modal" data-bs-target="#modelForm" onClick={loadData.bind(this,u)} className="Icon Icon_update">
                            <ion-icon   name="pencil-outline"></ion-icon>
                    </span>
                    
                  {u.role == "Admin" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#2a9d8f",
                        }}
                        className="badge pb-1"
                      >
                        {u.role}
                      </span>
                    </>
                  )}
                  {u.role == "User" && (
                    <>
                      <span
                        style={{
                          position: "absolute",
                          top: "5px",
                          left: "5px",
                          paddingBottom: "0px",
                          backgroundColor: "#f4a261",
                        }}
                        className="badge pb-1"
                      >
                        {u.role}
                      </span>
                    </>
                  )}

                <img 
                    src={`${BASE_URL}/user/getPhoto/${u._id}`}
                    alt=""
                    className="card-img-top img-main img-fluid"
                    style={{objectFit:"cover !important",height:"170px"}}
                  />

                    <div className="card-title fw-bolder text-center">
                        {u.first_name} {u.last_name}<br/> 
 
                        <hr />
                    </div>
                <div className="card-text text-center">
                    <div className="text-start">
                        <div className="row py-2 p-3">
                            <div className=""><span className='fw-bolder'>Email : </span>{u.email} </div><br/>
                            <div className=""><span className='fw-bolder'>Phone : </span> {u.phone} </div>

                        </div>
    
                    </div>
                </div>
                </div>

              
                <br/>
                </div>
            ))}
        </div>
      </div>
    </section>
    </>  )
}

export default Users