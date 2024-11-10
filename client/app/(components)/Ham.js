import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/app/instance";
import { RiHome4Line } from "@remixicon/react";

function Ham() {
  const router = useRouter();
  const [user, setUser] = useState("");
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`
        );
        // console.log(response.data,"inside ");

        let result_user = JSON.parse(JSON.stringify(response.data));
        // console.log(result_user);
        setUser(result_user);
      } catch (err) {
        console.log(err, "error");
      }
    })();
  }, []);
  return (
    <div className="  ">
      <div className="w-full px-5   flex justify-between items-center pt-5">
        <div className="text-xl font-bold"><a href="/subscriber/home">Happymom</a></div>
        <button
            className="px-5 py-1  rounded-md  "
            onClick={() => {
              router.push("/subscriber/home");
            }}
          >
            <RiHome4Line/>
          </button>

        <div className="drawer drawer-end w-[2rem]">
          <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content w-[2rem]">
            <label htmlFor="my-drawer-4" className="flex flex-col">
              <div className="w-[2.3rem] h-[0.3rem] bg-black rounded-md"></div>
              <div className="w-[2.3rem] h-[0.3rem] bg-black rounded-md mt-2"></div>
              <div className="w-[2.3rem] h-[0.3rem] bg-black rounded-md mt-2"></div>
            </label>
          </div>
          <div className="drawer-side z-50 ">
            <label
              htmlFor="my-drawer-4"
              aria-label="close sidebar"
              className="drawer-overlay"
            >
            </label>
            <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
             

              <li className="">
                <a>My Courses</a>
              </li>
              <li>
                <a href="/subscriber/userprofile">Profile</a>
              </li>
              <li>
                <a href="/subscriber/resetpassword">Reset password</a>
              </li>
              <li>
                <a href="/subscriber/updateemail">update e-mail</a>
              </li>
              <li>
                <a
                  onClick={() => {
                    sessionStorage.removeItem("sls_token");
                    router.push("/");
                  }}
                >
                  {" "}
                  Logout
                </a>
              </li>

              {user.id === 10001 ? (
                <>
                 <li className="  bg-red-400">
                    Administrator
                  </li>
                  <li>
                    {/* <a href="/subscriber/searchSubscriber">Search Subscriber</a> */}
                    <a>Search Subscriber</a>
                  </li>

                  <li>
                    <a href="/Admin/incentives">Incentives</a>
                  </li>
                  <li>
                    <a href="/Admin/positions">Positions</a>
                  </li>
                  <li>
                    <a href="/Admin/withdrawalTypes">Withdrawal Types</a>
                  </li>
                  <li>
                    <a href="/Admin/withdrawalStatuses">Withdrawal Statuses</a>
                  </li>
                </>
              ) : (
                <></>
              )}
            </ul>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ham;
