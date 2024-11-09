import {Routes,Route,useNavigate,useLocation} from 'react-router-dom'
import {Menu} from 'antd';
import {HomeOutlined,DashboardOutlined, UserOutlined, UnorderedListOutlined} from '@ant-design/icons';
import './App.css'
import { Footer } from 'antd/es/layout/layout';
import React,{useState} from 'react';
import { Login } from './components/auth/Login';
import  Signup  from './components/auth/Signup';
import PrivateRoute from './components/auth/PrivateRoute';

function App() {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate();

  // Check if the user is authenticated (replace with your actual authentication logic)
  const isAuthenticated = localStorage.getItem('token') !== null; // Example using localStorage

  // Redirect to login if not authenticated and trying to access protected routes
  if (!isAuthenticated && location.pathname !== '/login' && location.pathname !== '/signup') {
    navigate('/login');
  }
  // Check if the current route is the login page
  const isLoginPage = location.pathname === '/login';
  const isSignup=location.pathname==='/signup';
  return (
    <>
      <div>
        {/* Only render Header, SideMenu, and Footer if not on the login page */}
        {!isLoginPage &&!isSignup && <Header />}
        <div style={{ display: "flex", flexDirection: "row" }}>
          {!isLoginPage && !isSignup && <SideMenu />}
          <Content />
        </div>
        {!isLoginPage && !isSignup && <Footer />}
      </div>
    </>
  )
}
function Header(){
  const navigate=useNavigate();
    const [showMenu,setshowMenu]=useState(false)
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
                      <p onClick={()=>setToken(false)} className='dropdown-item'>Log out</p>
                  </div>
              </div>
          </div>
          : <button className='btn-login' onClick={()=>navigate('/login')} >Create Account</button>
      }

  </div>
</div>

}
function Content(){
  return ( <div>
    <Routes>
      <Route path='/' element={<PrivateRoute><div>Dashboard</div></PrivateRoute>}></Route>
      <Route path='/admin/listofpatient' element={<PrivateRoute><div>List of Patient</div></PrivateRoute>}></Route>
      <Route path='/admin/recordeddata' element={<PrivateRoute><div>Recorded Data</div></PrivateRoute>}></Route>
      <Route path='/user/service' element={<PrivateRoute><div>Service</div></PrivateRoute>}></Route>
      <Route path='/login' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      
    </Routes>
  </div>)
}
function SideMenu(){
  const navigate=useNavigate();
  return(
            <Menu style={{backgroundColor:"#87909E",height:"115Vh",width:"200px"}} onClick={({key})=>{
              navigate(key);

              }} items={[
              {label:"Dashboard",key:"/",icon:<HomeOutlined/>},
              {label:"List of Patient",key:"/admin/listofpatient",icon:<DashboardOutlined/>},
              {label:"Recorded Data",key:"/admin/recordeddata",icon:<UnorderedListOutlined/>}
            ]}>

            </Menu>
            
          );
}

export default App
