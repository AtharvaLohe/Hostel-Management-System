import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



 function PublicRoute({children}){

    const userDetails = useSelector((state) => state.user.userDetails);
    const isAuthenticated = !!userDetails;

    if(isAuthenticated){
        if(userDetails.role.roleName === 'Admin'){
            return <Navigate to={"/admin"}/>
        }else{
            return <Navigate to={"/hostler-dashboard"}/>
        }
    }

    return children;

}


export default PublicRoute