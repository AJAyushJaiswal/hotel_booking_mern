import {Navigate} from "react-router-dom";
import {useAppContext} from "../contexts/AppContext.jsx";


export default function ProtectedRoute({children}){
    const {isLoggedIn} = useAppContext();

    if(!isLoggedIn){
        return <Navigate to='/login' replace/>
    }
    
    return children;
}