import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { KeepContext } from "../Context/KeepContext"



const PrivateRouteWrapper = () =>
{
    const { user } = useContext(KeepContext)
    
    return user ? <Outlet/> : <Navigate to={"/login"}/>
}

export default PrivateRouteWrapper