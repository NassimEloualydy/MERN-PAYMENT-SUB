import React,{useState,useEffect} from 'react'
import toastr from 'toastr';
import Menu from './Menu'
import { BASE_URL } from '../config/config';
import { useLocation,useNavigate } from 'react-router-dom';
import Breadcrump from './Breadcrump';
import { CMultiSelect } from "@coreui/react-pro";
import "@coreui/coreui-pro/dist/css/coreui.min.css";

const MemberShipForm = () => {
      const pathPages=[{name:"Home",urlPath:"/"},{name:"MemberShip",urlPath:"/MemeberShip"}]
      const location=useLocation()
      const Navigate=useNavigate()
      const [courses,setCourses]=useState([])
      const [students,setStudents]=useState([])
      const getInputData=()=>{
          const {token}=JSON.parse(localStorage.getItem("user_info"))
          fetch(`${BASE_URL}/memebership/getInputData`,{
            method:"POST",
            headers:{
              "Accept":"application/json",
              "Content-Type":"application/json",
              "Authorization":`Bearer ${token}`

            },
          }).then(res=>res.json()).then(res=>{
              setCourses(res.data_cours)
              setStudents(res.data_user)
              console.log(res)
          }).catch(err=>{console.log(err)})
      }
      const message=location.state?.message
      const [menu,setMenu]=useState(false);
      const [memeberShip,setMemeberShip]=useState({
        student:"",
        cours:"",
        state:"",
        enrollement_date:"",
        start_date:"",
        end_date:"",
        complition_date:"",
        grad:"",
        attendance_percent:"",
        payment_status:"",
        notes:""
      })
      const handleChange=(e)=>{
        setMemeberShip({...memeberShip,[e.target.name]:e.target.value})
      }
          const MenuSwitch=(data)=>{
            setMenu(!menu)
    
          }
          const submitData=()=>{
            const {token}=JSON.parse(localStorage.getItem('user_info'))
                fetch(`${BASE_URL}/memebership/submitData`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify(memeberShip)
                }).then(res=>res.json()).then(res=>{
                    if(res.message){
                        toastr.success(res.message,"Success",{positionClass:"toast-bottom-right"})
                        setMemeberShip({
       student:"",
        cours:"",
        state:"",
        enrollement_date:"",
        start_date:"",
        end_date:"",
        complition_date:"",
        grad:"",
        attendance_percent:"",
        payment_status:"",
        notes:""
                        })
                    }
                            else if(res.err){
                        toastr.error(res.err,"Error",{positionClass:"toast-bottom-right"})
                    }else{
                        console.log(res)
                    }


                }).catch(err=>{
                    console.log(err)
                })
          }
          useEffect(()=>{
            getInputData()
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
              {(message=="New Data") && (
                <h3 className='fw-bolder'>New MemeberShip</h3>
              )}

            </div>
        </div>

    </div>
    <Breadcrump currentPage="New MemberShip" pathPages={pathPages} />
    <section className="m-3">
      <div className="container">
        <div className="row">
          <div className="card col-md-12 col-lg-12 mx-auto">
            <div className="card-body">
              {/* <div className="card-title h4 fw-bolder">Form</div> */}
              {/* <hr /> */}
              <form action="">
                <div className="row">
                <div className="col-md mt-2">
                  <div className="form-label">Student</div>
                  <select name="student" onChange={handleChange}  value={memeberShip.student} className="form-control">
                    <option value="">Choose a student</option>
                    {students.map((s,k)=>(
                    <option key={k} value={s._id}>{s.first_name} {s.last_name}</option>

                    ))}
                  </select>
                </div>
                <div className="col-md mt-2">
                  <div className="form-label">Cours</div>
                  <select name="cours" onChange={handleChange}  value={memeberShip.cours} className="form-control">
                    <option value="">Choose a cours</option>
                    {courses.map((c,k)=>(
                    <option key={k} value={c._id}>{c.name}</option>

                    ))}
                  </select>

                </div>  

                </div>
                <div className="row">
                <div className="col-md mt-2">
                  <div className="form-label">State</div>
                  <select name="state" onChange={handleChange} value={memeberShip.state}  className="form-control">
                    <option value="">Choose a state</option>
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>

                </div>  
              <div className="col-md mt-2">
                  <div className="form-label">Grad</div>
    <select name="grad" onChange={handleChange}  value={memeberShip.grad} className="form-control">
                    <option value="">Choose a state</option>
                    <option value="Starter">Starter</option>
                    <option value="Pro">Pro</option>
                    <option value="Entreprise">Entreprise</option>
                  </select>
                                  </div>

                </div>
                <div className="row">
          <div className="col-md mt-2">
                  <div className="form-label">Start Date</div>
                    <input type="date" name="start_date" value={memeberShip.start_date} onChange={handleChange} className="form-control" />
                </div>    <div className="col-md mt-2">
                  <div className="form-label">End Date</div>
                    <input type="date" name="end_date" onChange={handleChange} value={memeberShip.end_date} className="form-control" />
                </div>

                </div>

<div className="row">
  
            <div className="col-md mt-2">
                  <div className="form-label">Attendance</div>
    <select name="attendance_percent" onChange={handleChange} value={memeberShip.attendance_percent}  className="form-control">
                    <option value="">Choose a state</option>
                    <option value="Optionnal">Optionnal</option>
                    <option value="Required">Required</option>
                  </select>
                    </div>
            <div className="col-md mt-2">
                  <div className="form-label">Paiement Status</div>
    <select name="payment_status" onChange={handleChange} value={memeberShip.payment_status} className="form-control">
                    <option value="">Choose a state</option>
                    <option value="Paid">Paid</option>
                    <option value="Not Paid">Not Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </select>
                    </div>

</div>
                  <div className="row mt-2"><input type="button" onClick={submitData} value="Submit" className="btn btn-dark" /></div>
                <div className="row mt-2">
                </div>

              </form>
            </div>
          </div>
        
        </div>
      </div>
    </section>
    </>  )
}

export default MemberShipForm