import React from 'react'
import { useNavigate } from 'react-router-dom'

const Breadcrump = (props) => {
    const Navigate=useNavigate()

    const {currentPage,pathPages}=props
    const switchUrl=(path)=>{
        Navigate(path)
    }
  return (
    <div className="container mt-3">
        <div className="">
            
<nav aria-label="breadcrumb">
  <ol className="breadcrumb">
    {pathPages.map((d,key)=>(
    <li key={key} onClick={switchUrl.bind(this,d.urlPath)} className="breadcrumb-item"><a style={{cursor:'pointer'}}>{d.name}</a></li>
    ))}
    <li className="breadcrumb-item active" aria-current="page">{currentPage}</li>
  </ol>
  <hr/>
</nav>
        </div>
    </div>  )
}

export default Breadcrump