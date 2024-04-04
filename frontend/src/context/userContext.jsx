
import { createContext,useContext,useState } from "react";


const UserContext=createContext();

export const  useUserContext=()=>{
    return useContext(UserContext)
}

export const UserProvider=({children})=>{
     

     return (
        <UserContext.Provider value={{user,loginUser}}>
            {children}
        </UserContext.Provider>
     )
}

UserContext.displayName="UserContext"
