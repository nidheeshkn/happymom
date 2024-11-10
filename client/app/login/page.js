"use client";
import React, { useEffect,  useState } from "react";
import axios from "axios"

import { useRouter } from "next/navigation";
import Image from "next/image";

import view from "@/public/view.png";





// import view from '../../../public/view.png'
// import hide from '../../../public/hide.png'

function Registration() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginerr, setLoginErr] = useState("");

  const [show,setShow] = useState("view")
  const router = useRouter();



  
  useEffect(() => {
    // (async function (){
    //     if(location.href.includes("?")){
    //         const url = location.href.split("?")[1].split("=")[1]
    //         console.log(url,`${process.env.NEXT_PUBLIC_BASE_URL}/users/reference?referee=${url}`);
    //         const result = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/users/reference?referee=${url}`)
    //         setLink(result.data.user_data.link)
    //         setReferer(result.data.parent_subscriber.name);
    //     }
    //     else{
    //         return window.location.href = "/"
    //     }
    // })()
  }, []);

  return (
    <>
     <div className="py-6 px-3 flex justify-between items-center">
        <h1 className="text-xl" >happymom.com.in </h1>
      </div>
    <div className="w-full h-96 px-7 flex justify-center items-center">
     
      <div className="w-full  border-2 border-black rounded-lg h-96">
        <div className="flex justify-center font-semibold text-xl  ">
          <span className="my-5">Login</span>
        </div>

        <div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="px-6">
          <input
            placeholder="Mobile Number"
            className="py-3 px-3 my-5 focus:outline-blue-400 text-black placeholder:text-gray-500 placeholder:font-semibold rounded-md border-2 border-black w-full"
            onChange={(e) => {
              // console.log(e.target.value);
              setUsername(e.target.value);
              setLoginErr(false);
            }}
          />
        <div className="flex relative">
          <input
            placeholder="Password"
            type = {show === "view" ? "password":"text"}
            className="py-3 px-3 focus:outline-blue-400 mb-5 text-black placeholder:text-gray-500  placeholder:font-semibold rounded-md border-2 border-black w-full"
            onChange={(e) => {
              // console.log(e.target.value);

              setPassword(e.target.value);
              setLoginErr(false);
            }}
          />
         
          <Image alt="View password" src = {show === "view" ? view : hide} height = {25} width = {25} className="absolute right-5 top-3" onClick = {()=>{
            if(show === "view"){
              setShow("hide")
            }




            
            
            else{
              setShow("show")
            }
          }} />
          </div>
 {
            loginerr && <span className="text-[#ff0000]">Invalid user name or password...</span>

          }
          <button
            className="py-3 font-semibold rounded-md text-white bg-blue-400 w-full"
            onClick={() => {
              (async () => {

                try {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/user/login`,
                    {
                      username,
  
                      password,
                    }
                  );
                  console.log(response.data);
                  if (response.data.status==="success") {
                    
                    sessionStorage.setItem("sls_token", response.data.token);
                     
                   
                    return router.push("/subscriber/home");
                  }
                  
                  
                } catch (error) {
                  console.log(error);
                  
                  setLoginErr(true);
                  
                }
                console.log(username);
                console.log(password);


              })();
            }}
          >
            Login
          </button>


          <a href="/resetpassword"
            className="mt- font-semibold  text-blue  w-full"
            
          >
            Reset Password
          </a>
        </div>
      </div>
    </div>
    </>
  );
}

export default Registration;
