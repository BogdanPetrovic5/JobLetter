import { Navigate } from "react-router-dom";
import Loading from "../shared/loading/Loading";

function PrivateRoute({user, isLoading, children}){
    if(isLoading) return <Loading/>
    if(!user){
        return <Navigate to="/authentication" replace/>
    }
    return children
}
export default PrivateRoute