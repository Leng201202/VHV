import { Children } from 'react';
import {Route,Routes} from 'react-router-dom';

const USER_TYPES={
    PUBLIC:"Public User",
    NORMAL_USER:"Normal User",
    ADMIN_USER:"Admin user"
}

function New(){
    return <div>
       <Routes>
        <Route path="/" element={
            <PublicElement>
                <Home/>
            </PublicElement>}></Route>
        <Route path="/user" element={
            <UserElement>
                <User/>
            </UserElement>
        }></Route>
        <Route path="/admin" element></Route>
        <Route path="*" element="Page not found!!!"></Route>
       </Routes>
    </div>
}
function Home(){
    return <div>Home pages</div>
}
function User(){
    return <div>User pages</div>
}
function Admin(){
    return <div>Admin pages</div>
}
function PublicElement(){
    return <>{Children}</>;
}
function UserElement(){
    if(CURRENT_USER_TYPE===USER_TYPES.NORMAL_USER || CURRENT_USER_TYPE===USER_TYPES.ADMIN_USER){
        return <>{Children}</>;
    }else{
        return <div>You are not access to this pages</div>
    }
   
}

export default New;

