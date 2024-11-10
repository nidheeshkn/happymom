"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import hook from "@/public/landing.png";
import first from "@/public/first.png";
import sec from "@/public/sec.png";
import third from "@/public/third.png";
import parenting from "@/public/parenting.png";
import teen from "@/public/teen.png";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const token = sessionStorage.getItem("sls_token");
    console.log(token);

    if (token) {
      router.push("/subscriber/home");
    }
  }, [router]);
  return (
    <div>
      <div className="py-6 px-3 flex justify-between items-center">
        <h1 className="text-xl" >happymom.com.in </h1>
        <button
          className="btn btn-outline btn-primary"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login
        </button>
      </div>
      <div className="w-full h-[56vh] bg-[#FFA39C] flex flex-col justify-end items-center">
        <h1 className="text-xl text-blue-800 font-semibold px-5">
          Make Your Parenting A Success
        </h1>

        <Image alt="Happymom" src={hook} className="w-[16rem] h-[40vh]" />
      </div>

      <div>
        <div className="w-full flex justify-center mt-5">Categories</div>

        <div className="flex flex-col px-10 ">
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-[46vh] bg-[#64FFD1] rounded-md mt-5 flex justify-center items-end">
              <Image alt="Infants" src={first} className="w-[16rem] h-[40vh]" />
            </div>

            <span className="text-lg font-semibold my-5">0 - 2 Years</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-[46vh] bg-[#53FF98] rounded-md  flex justify-center items-end">
              <Image alt="Toadler"  src={sec} className="w-[16rem] h-[40vh]" />
            </div>
            <span className="text-lg font-semibold my-5">3 - 6 Years</span>
          </div>  
          <div className="flex flex-col justify-center items-center">
          <div className="w-full h-[46vh] bg-[#63FFFF] rounded-md  flex justify-center items-end">
            <Image alt="Scholars" src={third} className="w-[16rem] h-[40vh]" />
          </div>
          <span className="text-lg font-semibold my-5">6 - 12 Years</span>
          
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-[46vh] bg-[#53FF98] rounded-md  flex justify-center items-end">
              <Image alt="Teens" src={teen} className="w-[13rem] h-[35vh]" />
            </div>
            <span className="text-lg font-semibold my-5">13 - 19 Years</span>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-full h-[46vh] bg-[#64FFD1] rounded-md  flex justify-center items-end">
              <Image alt="Youngster" src={parenting} className="w-[13rem] h-[35vh]" />
            </div>

            <span className="text-lg font-semibold my-5">60 + Years</span>
          </div>
        </div>
      </div>
      
      
      <div className="w-full h-[16vh] bg-black">

      </div>
    </div>
  );
}
