"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "@/app/instance"


function Registration() {
  const [link, setLink] = useState("");
  // const [referer, setReferer] = useState("");

  // const [mobileerr, setMobileErr] = useState(false);

  const [passworderr, setPasswordErr] = useState(false);

  const [confpassworderr, setConfPasswordErr] = useState(false);


  // const [emailerr, setEmailErr] = useState(false);


  // const mobileRef = useRef("");

  const passwordRef = useRef("");

  const confirmRef = useRef("");

  // const emailRef = useRef("");


  useEffect(() => {
    (async function () {
      if (location.href.includes("?")) {
        const url = location.href.split("?")[1].split("=")[1]
        console.log(url, `${process.env.NEXT_PUBLIC_BASE_URL}/resetpassword?resettoken=${url}`);
        const result = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/readrequest`,{resettoken:url})

        console.log(result);
        
        setLink(result.data.request_data.request_link)
      }
      else {
        return window.location.href = "/login"
      }
    })()
  }, []);




  return (
    <div className="w-full h-screen px-7 flex justify-center items-center ">
      <div className="w-full  border-2 border-black rounded-lg h-[30rem] px-6 ">
        <div className="flex justify-center font-semibold text-xl ">
          <span className="my-5">Reset your Password</span>
        </div>



        <div className="px-0">
        



          <input
            placeholder="Password"
            className="placeholder:text-black placeholder:font-semibold px-3  focus:outline-blue-400 rounded-md border-2 border-black w-full py-2 mt-5 "
            ref={passwordRef}
            onChange={(e) => {
              const password = e.target.value
              if (password.length < 5) {
                setPasswordErr(true)

              } else {

                setPasswordErr(false)

              }

            }}

          />

          {
            passworderr && <span className="text-[#ff0000]">password length is less than five </span>

          }


          <input
            placeholder="Confirm Password"
            className="placeholder:text-black placeholder:font-semibold px-3  focus:outline-blue-400 rounded-md border-2 border-black w-full py-2 mt-5 "
            ref={confirmRef}

            onChange={(e) => {
              const confirm_password = e.target.value

              if (confirm_password != passwordRef.current.value) {
                setConfPasswordErr(true)
              } else {
                setConfPasswordErr(false)

              }

            }}

          />
          {
            confpassworderr && <span className="text-[#ff0000]">Password doesn&apos;t match</span>

          }




          <button
            className="font-semibold py-3 rounded-lg text-white bg-blue-400 w-full my-3"
            onClick={() => {
              
              const password = passwordRef.current.value;
              const conf = confirmRef.current.value;

              if (password === conf) {
                (async () => {
                  const response = await axios.post(
                    `${process.env.NEXT_PUBLIC_BASE_URL}/users/passwordreset`,
                    {
                      password,
                      resettoken: link,
                    }
                  );
                  console.log(response)

                  if (response.data) {
                    location.href = '/login'
                  }
                })();
              }
            }}
          >
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Registration;
