"use client";
import React, { useEffect, useState } from "react";
import { WhatsappShareButton } from "react-share";
import { usePathname, useRouter } from "next/navigation";

import axios from "@/app/instance";

function BottomNavbar() {
  const [link, setLink] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/user`
        );
        // console.log(response.data,"inside ");
        setLink(response.data.link);
      } catch (err) {
        console.log(err, "error");
      }
    })();
  }, []);
  return (
    <>
      <button
        className={
          pathname.includes("/home")
            ? "font-bold text-white text-sm bg-emerald-300 px-2 py-2 rounded-md"
            : "font-bold text-white text-sm"
        }
        onClick={() => {
          router.push("/subscriber/home");
        }}
      >
        Home
      </button>
      <button
        className={
          pathname.includes("/courses")
            ? "font-bold text-white text-sm bg-emerald-300 px-2 py-2 rounded-md"
            : "font-bold text-white text-sm"
        }
        onClick={() => {
          router.push("/courses");
        }}
      >
        Courses
      </button>
      <button
        className={
          pathname.includes("/wallet")
            ? "font-bold text-white text-sm bg-emerald-300 px-2 py-2 rounded-md"
            : "font-bold text-white text-sm"
        }
        onClick={() => {
          router.push("/wallet");
        }}
      >
        Wallet
      </button>

      <WhatsappShareButton
        url={`https://happymom.com.in/registration?referee=${link}`}
        title={`Hi i would like to invite you to join happymom. Please click the link below and register \n`}
      >
        <span className="font-bold text-sm text-white">Share</span>
      </WhatsappShareButton>
    </>
  );
}

export default BottomNavbar;
