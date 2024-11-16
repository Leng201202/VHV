function UserElement({children}){
    if(CURRENT_USER_TYPE===USER_TYPES.NORMAL_USER || CURRENT_USER_TYPE===USER_TYPES.ADMIN_USER){
        return <>{children}</>;
    }else{
        return <div>You are not access to this pages</div>
    }
   
  }
export default UserElement;