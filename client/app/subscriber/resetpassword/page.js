"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "@/app/instance";

import { useRouter } from "next/navigation";

import Ham from "@/app/(components)/Ham";

function PasswordReset() {
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/home`
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    })();
  });
  const [password, setPassword] = useState({
    passwordErr: "",
    passwordtog: false,
  });
  const [pass, setPass] = useState({ passwordErr: "", passwordtog: false });
  const [conf, setConf] = useState({ passwordErr: "", passwordtog: false });
  const [passworderr, setPasswordErr] = useState({
    passwordErr: "",
    passwordtog: false,
  });

  const passwordRef = useRef("");

  const confirmRef = useRef("");

  const currentPasswordRef = useRef("");

  const router = useRouter();
  return (
    <div className="w-full max-h-screen h-screen overflow-y-scroll">
      <Ham />

      <div className="w-full h-screen px-7 flex flex-col justify-center items-center ">
        <div className="w-full flex justify-between">
         
          <div></div>
        </div>
        <div className="w-full  border-2 border-black rounded-lg h-[30rem] px-6 ">
          <div className="flex justify-center font-semibold text-xl ">
            <span className="my-5">Reset Password</span>
          </div>

          <input
            ref={currentPasswordRef}
            placeholder="Current Password"
            type="text"
            className=" text-black placeholder:text-gray-500 placeholder:font-semibold px-3 focus:outline-blue-400 rounded-lg border-2 border-black w-full py-2 mt-5 "
          />

          {password.passwordtog && (
            <span className="text-red-600">{password.passwordErr}</span>
          )}

          <input
            ref={passwordRef}
            placeholder="New password"
            type="text"
            className="text-black placeholder:text-gray-500 placeholder:font-semibold px-3 focus:outline-blue-400 rounded-lg border-2 border-black w-full py-2 mt-5 "
          />

          {conf.passwordtog && (
            <span className="text-red-600">{conf.passwordErr}</span>
          )}

          <input
            ref={confirmRef}
            placeholder="Confirm new password"
            type="text"
            className="text-black placeholder:text-gray-500 placeholder:font-semibold px-3 focus:outline-blue-400 rounded-lg border-2 border-black w-full py-2 mt-5 "
          />
          {conf.passwordtog && (
            <span className="text-red-600">{pass.passwordErr}</span>
          )}
          {passworderr.passwordtog && (
            <span className="text-red-600">{passworderr.passwordErr}</span>
          )}
          <button
            className="font-semibold py-3 rounded-lg text-white bg-blue-400 w-full mt-7"
            onClick={() => {
              // if()

              if (!currentPasswordRef.current.value) {
                setPassword({
                  passwordErr: "Password field is empty",
                  passwordtog: true,
                });
              } else if (currentPasswordRef.current.value.length < 5) {
                setPassword({
                  passwordErr: "Five characters required",
                  passwordtog: true,
                });
              } else {
                setPassword({
                  passwordErr: "",
                  passwordtog: false,
                });
              }

              if (!passwordRef.current.value) {
                setPass({
                  passwordErr: "Password field is empty",
                  passwordtog: true,
                });
              } else if (passwordRef.current.value.length < 5) {
                setPass({
                  passwordErr: "Five characters required",
                  passwordtog: true,
                });
              } else {
                setPass({
                  passwordErr: "",
                  passwordtog: false,
                });
              }

              if (!confirmRef.current.value) {
                setConf({
                  passwordErr: "Password field is empty",
                  passwordtog: true,
                });
              } else if (confirmRef.current.value.length < 5) {
                setConf({
                  passwordErr: "Five characters required",
                  passwordtog: true,
                });
              } else {
                setConf({
                  passwordErr: "",
                  passwordtog: false,
                });
              }

              if (passwordRef.current.value != confirmRef.current.value) {
                setConf({
                  passwordErr: "Passwords does'nt match",
                  passwordtog: true,
                });
                setPass({
                  passwordErr: "Passwords does'nt match",
                  passwordtog: true,
                });
              } else {
                (async function () {
                  try {
                    console.log(
                      currentPasswordRef.current.value,
                      passwordRef.current.value >= 5 &&
                        confirmRef.current.value >= 5
                    );
                    if (
                      currentPasswordRef.current.value.length >= 5 &&
                      passwordRef.current.value.length >= 5 &&
                      confirmRef.current.value.length >= 5
                    ) {
                      const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_BASE_URL}/users/resetmypassword`,
                        {
                          curr: currentPasswordRef.current.value,
                          newpassword: passwordRef.current.value,
                        }
                      );

                      console.log(res.data);

                      router.push("/subscriber/userprofile");
                    }
                  } catch (err) {
                    console.log(err.response.data, "1234");

                    setPasswordErr({
                      passwordErr: err.response.data.message,

                      passwordtog: true,
                    });
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

export default PasswordReset;
