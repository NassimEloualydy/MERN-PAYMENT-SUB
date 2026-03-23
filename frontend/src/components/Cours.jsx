import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import Breadcrump from './Breadcrump';
const Cours = () => {
  const Navigate=useNavigate()
  const [menu,setMenu]=useState(false);
  const pathPages=[{name:"Home",urlPath:"/"}]
  const [data,setData]=useState([])
  const [courses,setCourses]=useState({
    name:"",
    price:"",
    rating:"",
    state:"",
    tags:"",
    prof_first_name:"",
prof_last_name:"",
prof_phone:"",
prof_email:"",
description:""
  })
const   deleteData=(data)=>{
    
}
const loadData=(data)=>{
    
}
    const handleChange=(e)=>{
        setCourses({...courses,[e.target.name]:e.target.value})
    }  
const MenuSwitch=(data)=>{
            setMenu(!menu)
    
          }
     const loadNewForm=()=>{
        Navigate("/CoursForm",{state:{message:"New Cours"}})
     }
     const getData=()=>{
        const {token}=JSON.parse(localStorage.getItem("user_info"))
        fetch(`${BASE_URL}/cours/getData`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
            body:JSON.stringify(courses)

        }).then(res=>res.json()).then(res=>{
            if(res.data){
                setData(res.data)
            }else{
                console.log(res)
            }
        }).catch(err=>{console.log(err)})
     }
     useEffect(()=>{
        getData()
        console.log(data)
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
                <h3 className='fw-bolder'>Courses</h3>
 <div className="container">
            <form action="">
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="name" onChange={handleChange}  value={courses.name}   placeholder='Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="price" onChange={handleChange}  value={courses.price}   placeholder='Price' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="rating" onChange={handleChange}  value={courses.rating}   placeholder='Rating' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="state" onChange={handleChange} value={courses.state}  placeholder='State' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="description" onChange={handleChange} value={courses.description}  placeholder='Description' className="form-control" /></div>
                  
                </div>
               
                <div className="row text-center">
                    <div className="col-md mt-2"><input type="text" name="tags" onChange={handleChange}  value={courses.tags}  placeholder='Tags' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="prof_first_name" onChange={handleChange}  value={courses.prof_first_name}  placeholder='Prof First Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="prof_last_name" onChange={handleChange}  value={courses.prof_last_name}  placeholder='Prof Last Name' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="prof_phone" onChange={handleChange}  value={courses.prof_phone}  placeholder='Prof Phone' className="form-control" /></div>
                    <div className="col-md mt-2"><input type="text" name="prof_email" onChange={handleChange}  value={courses.prof_email}  placeholder='Prof Email' className="form-control" /></div>
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
    <Breadcrump currentPage="Courses" pathPages={pathPages} />
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
                {data.map((c,key)=>(
                    <div className="col-md-6 col-lg-3">
                        <div className="card" style={{position:"relative"}}>
                             <span style={{position: "absolute", bottom: "2px",right: "5px",paddingBottom:"0px"}} onClick={deleteData.bind(this,c._id)} className="Icon Icon_delete">
                            <ion-icon   name="trash-outline"></ion-icon>
                    </span>
                    <span style={{position: "absolute", bottom: "2px",right: "35px",paddingBottom:"0px"}} data-bs-toggle="modal" data-bs-target="#modelForm" onClick={loadData.bind(this,c)} className="Icon Icon_update">
                            <ion-icon   name="pencil-outline"></ion-icon>
                    </span>
                    {c.state=='Open' && (
                        <>
                          <span style={{  position: "absolute",  top: "5px",  left: "5px",  paddingBottom: "0px",  backgroundColor: "#2a9d8f",}}className="badge pb-1" >{c.state} </span>
                        </>
                    )}
                        {c.state=='Sold Out' && (
                        <>
                          <span style={{  position: "absolute",  top: "5px",  left: "5px",  paddingBottom: "0px",  backgroundColor: "#ae2012",}}className="badge pb-1" >{c.state} </span>
                        </>
                    )}
                        {c.state=='In Proccess' && (
                        <>
                          <span style={{  position: "absolute",  top: "5px",  left: "5px",  paddingBottom: "0px",  backgroundColor: "#ee9b00",}}className="badge pb-1" >{c.state} </span>
                        </>
                    )}
                                    <img 
                                        src={`${BASE_URL}/cours/getPhoto/${c._id}`}
                                        alt=""
                                        className="card-img-top img-main img-fluid"
                                        style={{height:"200px",objectFit:"contain !important"}}
                                      />
                                      <div className="card-title fw-bolder text-center">
                                        {c.name}
                                        <hr/>
                                                  <div className="card-text text-center">
                    <div className="text-start">
                        <div className="row py-2 p-3">
                            <div className=""><span className='fw-bolder'>Price : </span> <span style={{backgroundColor:'#001219'}} className='badge'>{c.price} $</span>  </div><br/>
                            <div className=""><span className='fw-bolder'>Description : </span> {c.description} </div>
                        <div className="">
{c.tags.split(',').map((t, k) => {
  return (
    <span className="fw-bolder badge" style={{backgroundColor:"#e5e5e5",color:"black",margin:"1px"}} key={k}>
      {t}
    </span>
  );
})}
                            </div>
                        </div>
    
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
    </>
  )
}

export default Cours