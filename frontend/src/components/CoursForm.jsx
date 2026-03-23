
import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import Menu from './Menu'
import { useLocation } from 'react-router-dom';
import { CMultiSelect } from "@coreui/react-pro";
import { BASE_URL } from '../config/config';
import Breadcrump from './Breadcrump';
import "@coreui/coreui-pro/dist/css/coreui.min.css";
import {PayPalButtons,PayPalScriptProvider,usePayPalScriptReducer} from '@paypal/react-paypal-js'
import { tags } from '../config/config';
const CoursForm = () => {
const pathPages=[{name:"Home",urlPath:"/"},{name:"Courses",urlPath:"/cours"}]
const [profs,setProfs]=useState([])
const Navigate=useNavigate()
const getDataProfs=()=>{

  fetch(`${BASE_URL}/user/getData`,{
    method:"POST",
    headers:{
      "Accept":"application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify({        first_name:"",
        last_name:"",

        email:"",
        phone:"",
        role:"User"})
  }).then(res=>res.json()).then(res=>{
     if(res.data)
                setProfs(res.data)
            else{
                console.log(res)
            }
        }).catch(err=>console.log(err))
}
  const [formData,setFormData]=useState(new FormData());
const [valueTags,setValueTags]=useState([])
  const [cours,setCours]=useState({
    name:"",
    price:"",
    rating:"",
    state:"",
    tags:"",
    prof:"",
    description:"",
    state:""
  })
    var [tag, setTag] = useState(tags);
  const location=useLocation()
  const message=location.state?.message
  const corsUpdated=location.state?.user
  
  const handlechange=(e)=>{
    if(!Array.isArray(e)){

      const value=e.target?.name=='photo'?e.target?.files[0]:e.target?.value
      console.log(e.target)
      setCours({...cours,[e.target.name]:value})
      formData.set(e.target.name,value);
    }else{
      let d=[]
           for(var i=0;i<JSON.parse(JSON.stringify(e)).length;i++){
               d.push(JSON.parse(JSON.stringify(e))[i].value)
            }
    setCours({...cours,"tags":d})    
    setValueTags(d);

   formData.set("tags",d);
    }
  }
  const [menu,setMenu]=useState(false);

      const MenuSwitch=(data)=>{
        setMenu(!menu)

      }
  useEffect(()=>{
    if(corsUpdated){

      setUser({...corsUpdated,password:''})
      formData.set("first_name",corsUpdated.first_name)
      formData.set("last_name",corsUpdated.last_name)
      formData.set("email",corsUpdated.email)
      formData.set("phone",corsUpdated.phone)
      formData.set("_id",corsUpdated._id)
    }
    getDataProfs()

  },[])
  const submitData=()=>{
    const {token}=JSON.parse(localStorage.getItem("user_info"))
    fetch(`${BASE_URL}/cours/submitData`,{
      method:"POST",
      headers:{
        'Accept':'application/json',
        'Authorization':`Bearer ${token}`

      },body:formData
    }).then(res=>res.json()).then(res=>{
      if(res.err){
        toastr.error(res.err,"Error",{positionClass:"toast-bottom-right"})
      }else if (res.message){
        toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
        setFormData(new FormData())
        setCours({ 
              name:"",
    price:"",
    rating:"",
    state:"",
    tags:"",
    prof:"",})

Navigate("/cours")
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
              
                            {(message=='Update Cors') && (

                <h3 className='fw-bolder'>{corsUpdated.name}</h3>
              )}

              {(message=='New Cours') && (

                <h3 className='fw-bolder'>New Cours</h3>
              )}
            </div>
        </div>

    </div>
                {(message=='New Cours') && (
                    <Breadcrump currentPage="New Cours" pathPages={pathPages} />
              )}
                              {(message=='Update User') && (
                    <Breadcrump currentPage={corsUpdated.name} pathPages={pathPages} />
              )}

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
                  <input type="file" name="photo" onChange={handlechange} id="" className="form-control" style={{width:"96%",marginLeft:"2%"}} />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Name</div>
                  <input type="text" name="name" value={cours.name} onChange={handlechange} id="" className="form-control" style={{width:"96%",marginLeft:"2%"}} />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Price</div>
                  <input type="text" name="price" id="" value={cours.price} onChange={handlechange} className="form-control" style={{width:"96%",marginLeft:"2%"}} />
                </div>
                <div className="row col-md mt-2">
                  <div className="form-label">Rating</div>
                  <input type="text" name="rating" id="" value={cours.rating} onChange={handlechange} className="form-control" style={{width:"96%",marginLeft:"2%"}} />
                </div>
                   <div className="row col-md mt-2">
                  <div className="form-label">Prof</div>
                  <select name="prof"   value={cours.prof} onChange={handlechange} className="form-control" style={{width:"96%",marginLeft:"2%"}}
                    >
                      <option value="Choose a prof"> </option>
                  {profs.map((p,key)=>(
                        <option key={key} value={p._id}>{p.first_name} {p.last_name}</option>
                  ))}
                  
                    
                  </select>
                  
                </div> 
                <div className="row col-md mt-2">
                  <div className="form-label">Tags</div>
<CMultiSelect
                      options={tag}

                      name="tags"
                      value={valueTags}
                      onChange={handlechange}
                    />              
                      </div>
                  <div className="row col-md mt-2">
                  <div className="form-label">State</div>
                  
                  <select name="state" id="" value={cours.state} onChange={handlechange} className="form-control" style={{width:"96%",marginLeft:"2%"}}>
                    <option value="">Choose a state</option>
                    <option value="Open">Open</option>
                    <option value="Sold Out">Sold Out</option>
                    <option value="In Proccess">In Proccess</option>
                  </select>
                </div>
                      <div className="row col-md mt-2">
                  <div className="form-label">Description</div>
                  <input type="text" name="description" id="" value={cours.description} onChange={handlechange} className="form-control" style={{width:"96%",marginLeft:"2%"}} />
                </div>
                  <div className="row mt-2"><input type="button" onClick={submitData} value="Submit" className="btn btn-dark mt-2"  style={{width:"96%",marginLeft:"2%"}}/></div>
                <div className="row mt-2">
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

export default CoursForm