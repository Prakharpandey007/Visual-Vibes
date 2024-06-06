import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import {login,logout} from "./store/authSlice";
import {Header,Footer} from "./components/index"
import {Outlet} from 'react-router-dom'
//dispatch is a merger of react and redux
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  // .finally issliye use kiya authservice run hoga hi hoga chaye .then ho ya .catch
  useEffect(() => {
    authService.getCurrentUser()
    //then callback mai hme Data milta hai 
    //we collect data from user if we get then we login() else(if we dont get data) we logout().we use logout beacause it will update state if userdata dont find  
    .then((userData)=>{
    if(userData){
      dispatch(login({
        userData
      }))
    }
    else{
      dispatch(logout())
    }
    })

    .finally(()=>setLoading(false));
  }, []);
  //return in condional renderring
 return !loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-500">
    <div className="w-full block">
<Header />
  <main>
    <Outlet/>   
    //outlet comes from react router 
  </main>
<Footer />
    </div>
  </div>
 ) : null

  // return (
  //   <>
  //     <h1>Blog Website using Appwrite</h1>
  //   </>
  // );
}

export default App;
