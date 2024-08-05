'use client'
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { IUserSession } from "@/Interfaces/Types";

const ProfilePage = () => {

    const router = useRouter()
    const [userSession, setUserSession] = useState<IUserSession>()
  
    useEffect(() => {
      if(typeof window !== "undefined" && window.localStorage) {
        const userData = localStorage.getItem("userSession")
        setUserSession(JSON.parse(userData!))
      }
      
    }, [])

    useEffect (() => {
        userSession?.token === "undefined" && router.push("login")
    }, [userSession?.token])
  
    return(

        <div className=" m-10 flex  w-[95%] overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">           
              <div className="flex flex-row justify-between">
              <div className="ml-[70px] w-[230px]"><img src="/avatar.svg"></img></div> 
                  <div className="mt-10 px-5 pb-5">
                  <h5 className="text-[30px] tracking-tight text-slate-900 line-clamp-1">Welcome, {userSession?.user.name}!</h5>    
                  <h5 className="text-[20px] tracking-tight text-slate-900 line-clamp-1">- Your email is: {userSession?.user.email}</h5>
                  <h5 className="text-[20px] tracking-tight text-slate-900 line-clamp-1">- Your address is: {userSession?.user.address}</h5>
                  <h5 className="text-[20px] tracking-tight text-slate-900 line-clamp-1">- Your phone is: {userSession?.user.phone}</h5>
                  </div>
                                  
              </div>
          </div>
        
    )
}

export default ProfilePage;