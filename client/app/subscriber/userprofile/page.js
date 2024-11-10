"use client";

import axios from "@/app/instance";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Ham from "@/app/(components)/Ham";
import { RiEdit2Line } from "@remixicon/react";

function Profile() {
  const [profile, setProfile] = useState({});

  const router = useRouter();
  useEffect(() => {
    console.log("profile");

    (async function () {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/profile`
      );
      console.log(response);
      setProfile(response.data.my_data);
    })();
  }, []);

  return (
    <div className="w-full max-h-screen h-screen overflow-y-scroll">
      <div className="  ">
        <Ham />
      </div>
      <div className="mt-[7vh] px-5 max-h-[100vh] overflow-y-scroll overflow-x-hidden">
        <div className="mb-5 w-full flex justify-between">

          <button
            className="px-5 py-1 bg-slate-500 rounded-md text-white "
            onClick={() => router.push("/subscriber/editprofile")}
          >
            <RiEdit2Line/>
          </button>
        </div>
        <div className="         h-[11vh] border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Name</h1>
          <h1 className="font-semibold">{profile.name}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">DOB</h1>
          <h1 className="font-semibold">{profile.dob}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">DOJ</h1>
          <h1 className="font-semibold">
            {profile.doj && profile.doj.slice(0, profile.doj.indexOf("T"))}
          </h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Aadhar</h1>
          <h1 className="font-semibold">{profile.adhaar_num}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">PAN</h1>
          <h1 className="font-semibold">{profile.pan_num}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">House Name</h1>
          <h1 className="font-semibold">{profile.house_name}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Street</h1>
          <h1 className="font-semibold">{profile.street}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">P.O</h1>
          <h1 className="font-semibold">{profile.po}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">PIN</h1>
          <h1 className="font-semibold">{profile.pin}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">District</h1>

          <h1 className="font-semibold">{profile.district}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">State</h1>
          <h1 className="font-semibold">{profile.state}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Country</h1>
          <h1 className="font-semibold">{profile.country}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Position</h1>

          <h1 className="font-semibold">{profile.position_id}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Acc Number</h1>
          <h1 className="font-semibold">{profile.account_num}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Bank Name</h1>
          <h1 className="font-semibold">{profile.bank_name}</h1>
        </div>

        <div className="         h-[11vh] mt-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">Acc Holder</h1>
          <h1 className="font-semibold">{profile.account_holder_name}</h1>
        </div>

        <div className="         h-[11vh] my-5 border-2 border-[#2AA2E6] rounded-md px-3 flex justify-between items-center shadow-lg">
          <h1 className="font-semibold ">IFSC Code</h1>
          <h1 className="font-semibold">{profile.ifsc_code}</h1>
        </div>
      </div>
    </div>
  );
}

export default Profile;
