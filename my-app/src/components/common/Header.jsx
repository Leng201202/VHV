import {Routes,Route,useNavigate,useLocation} from 'react-router-dom'
import React,{useState} from 'react';
function Header(){
    const navigate=useNavigate();
      const [token,setToken]=useState(true)
    return<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",backgroundColor:"#87909E",height:"70px"}}>
    <h2>VHV follow up </h2>
  
    <div style={{display:"flex",gap:"20px",alignItems:"center"}}>
        {
            token
            ? <div className='container'>
                <img className='profile-image' src='https://www.pngkey.com/png/full/202-2024792_profile-icon-png.png' alt=''/>
                <img className='settings-icon' src='https://th.bing.com/th/id/OIP.-nNvWLvx3MfEpdQM0iQjQQHaHa?rs=1&pid=ImgDetMain' alt=''/>
                <div className='dropdown'>
                    <div className='dropdown-content'>
                        <p onClick={()=>navigate('my-profile')} className='dropdown-item'>Profile</p>
                        <p onClick={()=>navigate('/login')} className='dropdown-item'>Log out</p>
                    </div>
                </div>
            </div>
            : <button className='btn-login' onClick={()=>navigate('/login')} >Create Account</button>
        }
  
    </div>
  </div>
  
  }
  export default Header;