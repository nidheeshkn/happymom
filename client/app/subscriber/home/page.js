"use client";

import axios from "@/app/instance";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import chip from "@/public/chip.png";
import person from "@/public/person.png";

import Ham from "@/app/(components)/Ham";
import BottomNavbar from "@/app/(components)/BottomNavbar";

function Home() {
  const [subscriberData, setSubscriberData] = useState({});
  const [subordinateData, setSubordinateData] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/home`
        );

        setSubscriberData(response.data.subscriber_data || {});
        setSubordinateData(response.data.subordinate_data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-h-screen overflow-y-scroll">
      <Ham/>
      <div className="p-2">
        <div className="w-90 flex justify-center items-center mt-[2rem]">
          <div className="w-full flex flex-col justify-center h-[28vh] bg-[#3C3C3C] rounded-md px-5">
            <h2 className="mt-3 text-[#C6C6C6] font-semibold drop-shadow-2xl">
              Happymom
            </h2>
            <div className="mt-5">
              <Image src={chip} className="w-10 h-10" alt="Chip logo" />
              <h4 className="text-[#C6C6C6] font-semibold ">
                {subscriberData.subscriber_id}
              </h4>
            </div>
            <div className="flex h-10 justify-between items-center">
              <h4 className="text-[#C6C6C6] font-semibold textshadow">
                {subscriberData.name}
              </h4>
              <div className="flex flex-col items-center text-[#C6C6C6] text-sm font-semibold ">
                <h6 className="textshadow">Valid Till</h6>
                <h6 className="textshadow">{subscriberData.validity_date}</h6>
              </div>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex flex-col overflow-y-scroll">
          <div className="overflow-x-hidden max-h-[45vh]">
            <div className="inline-block min-w-full py-2">
              {subordinateData.length > 0 && (
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subordinateData.map((subscriber) => (
                        <tr key={subscriber.subscriber_id}>
                          <td>
                            <div className="flex items-center gap-3">
                              <div className="avatar">
                                <div className="mask mask-squircle h-10 w-10">
                                  <Image src={person} alt={`${subscriber.name}'s avatar`} />
                                </div>
                              </div>
                              <div>
                                <div 
                                className="font-bold"
                                onClick={() => {
                                  router.push(
                                    `/subscriber/viewsubscriber/${subscriber.subscriber_id}`
                                  );
                                }}
                                >{subscriber.name}</div>
                                <div className="text-sm opacity-50">{subscriber.position_id}</div>
                              </div>
                            </div>
                          </td>
                          <td>{subscriber.position_id}</td>
                        </tr>
                      ))}
                    </tbody>
                    {/* foot */}
                    <tfoot>
                      <tr>
                        <th>Name</th>
                        <th>Position</th>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <div className="w-full h-16 bg-[#4F95FF] fixed z-10 bottom-0 flex justify-between items-center px-5">
        <BottomNavbar />
      </div>
    </div>
  );
}

export default Home;