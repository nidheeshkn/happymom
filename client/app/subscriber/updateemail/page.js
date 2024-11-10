"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "@/app/instance"
import Ham from "@/app/(components)/Ham";
// import { useRouter } from "next/navigation";



function UpdateEmail() {

  // const router = useRouter()

  const [users_data, setUsersData] = useState({});
  const [showinfo, setShowInfo] = useState(false)
  const [mobileerr, setMobileErr] = useState(false);

  const mobileRef = useRef("");

  const emailRef = useRef("");

  useEffect(() => {

    // const token = sessionStorage.getItem("sls_token");
    // console.log(token);
    (async function () {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`);

        // console.log(response.data);
        let results = JSON.parse(JSON.stringify(response.data));
        console.log(results);
        setUsersData({ ...results });
        // console.log(users_data);
      }
      catch (err) {
        console.log(err)
      }
    })();
  }, []);

  return (
    <div className="w-full max-h-screen h-screen overflow-y-scroll">
      <Ham />
      <div className="w-full px-7 flex justify-center items-center ">
        <div className="w-full flex justify-between">
          
        </div>
      </div>
      <div className="w-full h-screen px-6 flex justify-center items-center ">
        <div className="w-full  border-2 border-black rounded-lg h-[30rem] px-6 ">
          <div className="flex justify-center font-semibold text-xl ">
            <span className="my-5">Update Your Email</span>
          </div>

          <div>
            <div>
              <div></div>
              <div className="w-full justify-between">
                <div></div>

              </div>
            </div>
          </div>

          <div className="flex justify-center text-l ">
            {users_data.email
              ?
              <span className="my-5">Your email registered with us is {users_data.email}</span>
              :
              <span className="my-5">You have not resistered any email with us</span>
            }

          </div>

          <div className="px-0">
            <input
              placeholder="Mobile Number"
              className="placeholder:text-black placeholder:font-semibold px-3 focus:outline-blue-400 rounded-md border-2 border-black w-full py-2  "
              ref={mobileRef}

              onChange={(e) => {
                const mobile_num = e.target.value
                if (mobile_num.length === 10) {
                  console.log(mobile_num);
                  console.log(users_data.mobile_number);
                  if (mobile_num === users_data.mobile_number) {
                    setMobileErr(false);
                  } else {
                    setMobileErr(true);
                  }

                }

              }}
            />

            {

              mobileerr && <span className="text-[#2d8d52]">This Mobile number is not registered with us......</span>
            }



            <input
              ref={emailRef}
              placeholder="Email"
              type="text"
              className="placeholder:text-black placeholder:font-semibold px-3 focus:outline-blue-400 rounded-lg border-2 border-black w-full py-2 mt-5 "

            />



            <button
              className="font-semibold py-3 rounded-lg text-white bg-blue-400 w-full my-3"
              onClick={() => {
                const mobile_num = mobileRef.current.value;

                const email = emailRef.current.value;

                console.log(mobile_num);

                if (mobile_num.length === 10) {
                  (async () => {
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/user/updatemyemail`,
                      {
                        mobile_number: mobile_num,

                        email: email,

                      }
                    );
                    console.log(response)
                    setShowInfo(true)





                    setTimeout(() => {
                      setShowInfo(false)
                    }, 5000)


                  })();
                }
              }}
            >
              Update My Email
            </button>
          </div>
        </div>








        {
          showinfo &&
          <div role="alert" className="alert alert-info absolute z-50 px-7 w-[29rem] top-[69vh]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>your email is updated...</span>
          </div>

        }
      </div>
    </div>
  );
}

export default UpdateEmail;
