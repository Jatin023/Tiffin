 
import { createContext,useContext,useState,useEffect } from "react";

const AuthContext=createContext();

export const AuthProvider=({children})=>
{
    const [user,setUser]=useState(null);
    const [token,setToken]=useState(null);


      useEffect(()=>{
        try{
            const storedUser=localStorage.getItem("user");
            const storedToken=localStorage.getItem("token");
            if(storedUser && storedUser!=="undefined"){
              setUser(JSON.parse(storedUser));
            }
            if(storedToken&&storedToken!=="undefined")
            {
              setToken(storedToken)
            }

        }catch(error)
        {
          console.error("error to save auth data",error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      },[]);


      const login=(userData,tokenData)=>{
        if(!userData || !tokenData){
          console.error("Invalid login Data",userData,tokenData);
          return;
        }
        setUser(userData);
        setToken(tokenData);
        localStorage.setItem("user",JSON.stringify(userData));
        localStorage.setItem("token",tokenData);
      };

      const logout=()=>{
        setUser(null);
        setToken(null);
            localStorage.removeItem("user");
    localStorage.removeItem("token");
        
      }

      return (
        <AuthContext.Provider value={{user,token,login,logout}}>
          {children}
        </AuthContext.Provider>

      );

     
}
 export const useAuth=()=>useContext(AuthContext);