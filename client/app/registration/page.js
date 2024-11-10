"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "@/app/instance";
import { useRouter } from "next/navigation";

function Registration() {
  const router = useRouter();
  const [terms, setTerms] = useState(true);
  const [link, setLink] = useState("");
  const [referer, setReferer] = useState("");

  const [mobileerr, setMobileErr] = useState(false);

  const [passworderr, setPasswordErr] = useState(false);

  const [confpassworderr, setConfPasswordErr] = useState(false);

  const [emailerr, setEmailErr] = useState({ emailerr: false, message: "" });

  const mobileRef = useRef("");

  const passwordRef = useRef("");

  const confirmRef = useRef("");

  const emailRef = useRef("");

  const nameRef = useRef("");


  const [finalErr, setFinalErr] = useState({ finalErr: false, message: "" });
  useEffect(() => {
    (async function () {
      if (location.href.includes("?")) {
        const url = location.href.split("?")[1].split("=")[1];
        console.log(
          url,
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/reference?referee=${url}`
        );
        const result = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/reference?referee=${url}`
        );
        setLink(result.data.user_data.link);
        setReferer(result.data.parent_subscriber.name);
      } else {
        return (window.location.href = "/");
      }
    })();
  }, []);

  return (
    <div className="w-full h-screen px-7 flex justify-center items-center ">
      <div className="w-full  border-2 border-black rounded-lg h-[30rem] px-6 ">
        <div className="flex justify-center font-semibold text-xl ">
          <span className="my-5">Register</span>
        </div>

        <div>
          <div>
            <div></div>
            <div className="w-full justify-between">
              <div></div>

              <div className="mb-3">
                <span>Reference by : {referer}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-0">
          <input
            placeholder="Mobile Number"
            className="placeholder:text-black placeholder:font-semibold px-3 focus:outline-blue-400 rounded-md border-2 border-black w-full py-2  "
            ref={mobileRef}
            onChange={(e) => {
              const mobile_num = e.target.value;

              if (mobile_num.length === 10) {
                (async function () {
                  try {
                    const response = await axios.post(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/users/checkAvailability`,
                      {
                        mobile_number: mobile_num,
                      }
                    );
                    console.log(response);

                    if (response.data.availability === "false") {
                      setMobileErr(true);
                    } else {
                      setMobileErr(false);
                    }
                  } catch (error) {
                    console.log(error);
                    
                  }
                })();
              }
            }}
          />

          {mobileerr && (
            <span className="text-[#ff0000]">Mobile number already exist</span>
          )}
          <input
            placeholder="Password"
            className="placeholder:text-black placeholder:font-semibold px-3  focus:outline-blue-400 rounded-md border-2 border-black w-full py-2 mt-5 "
            ref={passwordRef}
            onChange={(e) => {
              const password = e.target.value;

              const confirm_password = confirmRef.current.value;
              if (confirm_password != password) {
                setConfPasswordErr(true);
              } else {
                setConfPasswordErr(false);
              }
              if (password.length < 5) {
                setPasswordErr(true);
              } else {
                setPasswordErr(false);
              }
            }}
          />

          {passworderr && (
            <span className="text-[#ff0000]">
              password length is less than five{" "}
            </span>
          )}

          <input
            placeholder="Confirm Password"
            className="placeholder:text-black placeholder:font-semibold px-3  focus:outline-blue-400 rounded-md border-2 border-black w-full py-2 mt-5 "
            ref={confirmRef}
            onChange={(e) => {
              const confirm_password = e.target.value;

              if (confirm_password != passwordRef.current.value) {
                setConfPasswordErr(true);
              } else {
                setConfPasswordErr(false);
              }
            }}
          />
          {confpassworderr && (
            <span className="text-[#ff0000]">Password doesn&apos;t match</span>
          )}

          <input
           ref={nameRef}
            placeholder="Name"
            type="text"
            className="placeholder:text-black placeholder:font-semibold px-3  focus:outline-blue-400 rounded-md border-2 border-black w-full py-2 mt-5 "
            // onChange={(e)=>{         }}
          />
          <input
            ref={emailRef}
            placeholder="Email"
            type="text"
            className="placeholder:text-black placeholder:font-semibold px-3  focus:outline-blue-400 rounded-md border-2 border-black w-full py-2 mt-5 "
            // onChange={(e)=>{              const email=e.target.value;            }}
          />

          {emailerr.emailerr && (
            <span className="text-[#ff0000]">{emailerr.message}</span>
          )}
          <div>
            <span className="text-sm">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">
                    I agree with{" "}
                    <span
                      className="text-blue-500"
                      onClick={() => setTerms(true)}
                    >
                      Terms and Conditions
                    </span>
                  </span>
                  <input
                    type="checkbox"
                    defaultChecked
                    id="termscond"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFinalErr({
                          finalErr: false,
                          message: "",
                        });
                      } else {
                        setFinalErr({
                          finalErr: true,
                          message: "Please agree to the terms and conditions",
                        });
                      }
                    }}
                  />
                </label>
              </div>
            </span>

            {finalErr.finalErr && (
              <span className="text-red-500 text-[0.8rem]">
                {finalErr.message}
              </span>
            )}
          </div>

          <button
            className={
              mobileerr ||
              terms ||
              passworderr ||
              finalErr.finalErr ||
              confpassworderr
                ? "font-semibold py-3 rounded-lg text-white  w-full my-3 bg-slate-300"
                : "font-semibold py-3 rounded-lg text-white bg-blue-400 w-full my-3"
            }
            disabled={
              mobileerr ||
              passworderr ||
              confpassworderr ||
              terms ||
              finalErr.finalErr
            }
            onClick={() => {
              const checkbox = document.getElementById("termscond").checked;
              // console.log(checkbox)
              if (checkbox) {
                setFinalErr({ finalErr: false, message: "" });

                const mobile_num = mobileRef.current.value;
                const password = passwordRef.current.value;
                const conf = confirmRef.current.value;
                const name = nameRef.current.value;
                const email = emailRef.current.value;

                if (email.length > 1) {
                  if (password && conf && password === conf) {
                    (async () => {
                      try {
                        const response = await axios.post(
                          `${process.env.NEXT_PUBLIC_BASE_URL}/users/registration`,
                          {
                            mobile_number: mobile_num,
                            password,
                            name,
                            email,
                            refference_id: link,
                          }
                        );
                        console.log(response);

                        if (response.data) {
                          location.href = "/login";
                        }
                      } catch (err) {
                        console.log(err);

                        setFinalErr({
                          finalErr: true,
                          message: err.response.data.message,
                        });
                      }
                    })();
                  }
                } else {
                  // console.log('check terms and conditions');
                  setFinalErr(true);
                }
              } else {
                setEmailErr(true);
              }
            }}
          >
            Register
          </button>

          <div className="w-full flex justify-center">
            <span className="text-blue-500" onClick={() => router.push("/")}>
              Main page
            </span>
          </div>
        </div>

        {terms && (
          <div className="w-full px-5 h-[100vh] absolute top-0 left-0 bg-white flex justify-center shadow-2xl">
            <div className="mt-10 w-full overflow-scroll ">
              <ul className="menu bg-base-200 w-full rounded-box flex flex-col items-center ">
                <li className=" text-[1rem]">
                  <a>
                    {" "}
                    സ്വന്തം താല്പര്യത്തോട് കൂടിയാണ് താങ്കൾ കോഴ്സ് പർച്ചേസ്
                    ചെയുന്നത്. കോഴ്സിൻറ്റെ കാലാവധി ഒരു വർഷമാണ്.
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    {" "}
                    കോഴ്സ് ഇഷ്ടപെട്ടാൽ താങ്കളുടെ സുഹൃത്തുക്കൾക്കോ ബന്ധുക്കൾക്കോ
                    കോഴ്സ് ഷെയർ ചെയ്യാ വുന്നതാണ്. എന്നാൽ അങ്ങനെ കോഴ്സ് ഷെയർ
                    ചെയ്യണമെന്ന യാതൊരു നിർബന്ധവും താങ്കൾക്കില്ല
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    {" "}
                    താങ്കൾ ഷെയർ ചെയുന്നതിലുടെ മറ്റൊരാൾ കോഴ്സ് പർച്ചെയ്‌സ്
                    ചെയ്യുകയാണെങ്കിൽ അതാത് സമയത്ത് തീരുമാനിക്കപെടുന്ന
                    ഇൻസെൻറ്റീവ് താങ്കളുടെ വാലറ്റിലേക് വരവ് വെക്കുന്നതും ആയത് 500
                    രൂപക്ക് മുകളിൽ എത്തുമ്പോൾ താങ്കളുടെ റിക്വസ്റ്റ് ലഭിച്ചാൽ
                    അടുത്ത 48 മണിക്കൂറുകൾക്കകം തുക താങ്കളുടെ ബാങ്ക്
                    അക്കൗണ്ടിലേക്ക് വരവ് വെക്കുന്നതാണ്.
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    ഇൻസെൻറ്റീവ് ലഭിക്കുന്നതിനായി ബാങ്ക് ഡീറ്റെയിൽസ് പാൻ കാർഡ്
                    നമ്പർ കൃത്യമായി നൽകിയിട്ടുണ്ട് എന്നുറപ്പ് വരുത്തേണ്ട ചുമതല
                    താങ്കൾക്കുള്ളതാണ്.
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    കോഴ്സ് പരിചയ പെടുത്തുന്നതിന്റെ ഭാഗമായി യാതൊരു പണമിടപാടും
                    നടത്താൻ ആരെയും ചുമതലപെടുത്തിയുട്ടുള്ളതല്ല
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    ഈ കോഴ്സ് വാങ്ങിയ താങ്കൾക്ക് കോഴ്സ് ഇഷ്ടപ്പെട്ടില്ല എങ്കിൽ,
                    24 മണിക്കൂറിനകം സ്ഥാപനത്തെ അറിയിക്കേണ്ടതാണ്. അങ്ങനെ
                    അറിയിക്കുന്ന താങ്കൾക്ക് സമാന വിലയുള്ള മറ്റൊരു കോഴ്സ്
                    വാങ്ങുന്നതിനുള്ള സൗകര്യം ചെയ്തു തരുന്നതാണ്. അല്ലാത്തപക്ഷം
                    GST കഴിച്ചുള്ള തുക താങ്കൾക്ക് തിരികെ നൽകുന്നതാണ്.(ഈ പ്രോസസ്
                    പൂർത്തിയാക്കാനായി രണ്ടു ദിവസം മുതൽ ഏഴു ദിവസം വരെ
                    എടുക്കുന്നതാണ്)
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    ഒരിക്കൽ കോഴ്‌സ് ഇഷ്ടപ്പെടാതെ തുക റിഫണ്ട് ചെയ്യുന്നവർക്ക്
                    പിന്നീട്ട് ഒരിക്കലും ഈ സംരംഭത്തിന്റെ ഭാഗമാകാൻ കഴിയുന്നതല്ല.
                  </a>
                </li>

                <li className=" text-[1rem]">
                  <a>
                    റെഫെറൽ ഇൻസെൻറ്റീവ് ലഭിക്കുന്നതിനുള്ള അർഹത കോഴ്സ് പർച്ചേസ്
                    ചെയ്തവർക്ക് മാത്രം ലഭിക്കുക
                  </a>
                </li>
                <li className=" text-[1rem]">
                  <a>
                    കോഴ്സ് കാലാവധി ഒരുവർഷമാണ് ഈ പ്രോഗ്രാമിൽ തുടരാൻ
                    ആഗ്രഹിക്കുന്നവർക്ക് പുതിയകൊഴ്‌സുകൾ വാങ്ങി മെമ്പർഷിപ്പ്
                    കാലാവധി നീട്ടികൊണ്ടുപോകാവന്നതാണ്
                  </a>
                </li>
                <div className="form-control">
                  <label className="cursor-pointer label">
                    <span className="label-text font-bold">
                      മേല്പറഞ്ഞിരിക്കുന്ന Terms & Conditions ഞാൻ പൂർണമായി
                      വായിച്ചു മനസിലാക്കിയിരിക്കുന്നു. അംഗീകരിക്കുന്നു
                    </span>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-info"
                      onChange={(e) => {
                        console.log("check");
                        if (e.target.checked) {
                          console.log("done");
                          setTerms(false);
                          setFinalErr({ finalErr: false, message: "" });
                        }
                      }}
                    />
                  </label>
                </div>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Registration;
