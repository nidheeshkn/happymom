import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "@/app/instance";
import { RiHome4Line, RiSearch2Line } from "@remixicon/react";
import person from "@/public/person.png";


// import SearchBar from "./SearchBar";

function Ham() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [query, setQuery] = useState("");
  const [subscribers, setSubscribers] = useState("");

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

  const handleSubmit = async () => {
    // e.preventDefault();
    // Perform search logic here, e.g., fetch data from an API
    // console.log("Search query:", query);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/searchSubscriber`,
        {params:{searchQuery:query}}
      );
      const results = response.data;
      // console.log(results);
      setSubscribers(results);
    } catch (error) {
      console.error("Error fetching subscriber data:", error);
    }


  };
  return (
    <div className="  ">
      <div className="w-full px-5   flex justify-between items-center pt-5">
        <div className="text-xl font-bold">
          <a href="/subscriber/home">Happymom</a>
        </div>

        <button
          className=""
          onClick={() => {
            router.push("/subscriber/home");
          }}
        >
          <RiHome4Line />
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="">
            <RiSearch2Line/>
          </div>
          <div
            tabIndex={0}
            className="dropdown-content card card-compact bg-primary text-primary-content z-[1] w-64 p-2 shadow"
          >
            <div className="card-body">
              <div className="search-bar flex justify-center ">
                <input
                  className=" w-60"
                  type="text"
                  placeholder="search Subscriber"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    handleSubmit();
                  }}
                />
              </div>
              <div className="flex justify-center">
              {subscribers.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>mobile</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((user) => (
                        <tr key={user.id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-10 w-10">
                                  <Image src={person} alt={`${user.id}'s avatar`} />
                                </div>
                              </div>
                              <div>
                                <div 
                                className="font-bold"
                                onClick={() => {
                                  router.push(
                                    `/subscriber/viewsubscriber/${user.id}`
                                  );
                                }}
                                >{user.subscriber?.name?user.subscriber.name:null}</div>
                              </div>
                            </div>
                          </td>
                          <td>{user.mobile_number}</td>
                        </tr>
                      ))}
                    </tbody>
                    {/* foot */}
                    
                  </table>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>

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
            ></label>
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
                  <li className="  bg-red-400">Administrator</li>
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
