"use client";

import React, { useEffect  } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import chip from "@/public/chip.png";
import person from "@/public/person.png";



function SubscriberDetails({subscriberUserData,subscriberData, subordinateData}) {
  const params = useParams();


  // const [subscriberData, setSubscriberData] = useState({});
  // const [subscriber_user_data, setSubscriberUserData] = useState({});
  // const [subordinateData, setSubordinateData] = useState([]);
  const router = useRouter();

  useEffect(() => {




  }, [params]);

 
  console.log(subscriberData);

  return (

    <div className=" p-2">
      {/* Subscriber Info */}
      <div className="w-90 flex justify-center items-center mt-[2rem]">
        <div className="w-full flex flex-col justify-center h-[28vh] bg-[#9A8C3C] rounded-md px-5">
          <div className="flex h-10 justify-between items-center">
            <h4 className="text-[#C6C6C6] font-semibold textshadow">
              happymom.com.in
            </h4>
            <h6 className="text-[#C6C6C6] text-sm font-semibold textshadow">
              {subscriberUserData.mobile_number}
            </h6>
          </div>

          <div className="mt-5 flex ">
            <Image src={chip} alt="logo" width={40} height={40} />
            <h4 className="text-[#C6C6C6] font-semibold">
              {subscriberData.subscriber_id}
            </h4>
          </div>

          <div className="flex h-10 justify-between items-center">
            <h4 className="text-[#C6C6C6] font-semibold textshadow">
              {subscriberData.name}
            </h4>
            <div className="flex flex-col items-center text-[#C6C6C6] text-sm font-semibold">
              <h6 className="textshadow">Valid Till</h6>
              <h6 className="textshadow">{subscriberData.validity_date}</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Subordinate Data */}
      <div className="flex flex-col overflow-y-scroll">
        <div className="overflow-x-hidden max-h-[45vh]">
          {subordinateData.length > 0 && (
            <table className="table w-full py-2">
              {/* Table Head */}
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                {subordinateData.map((subordinate) => (
                  <tr key={subordinate.subscriber_id}>
                    <td
                      onClick={() =>
                        router.push(
                          `/subscriber/viewsubscriber/${subordinate.subscriber_id}`
                        )
                      }
                    >
                      <div className="flex items-center gap-3 cursor-pointer">
                        <Image
                          alt="person"
                          src={person}
                          width={40}
                          height={40}
                        />
                        <div>
                          <div className="font-bold">{subordinate.name}</div>
                          <div className="text-sm opacity-50">
                            {subordinate.position_id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{subordinate.position_id}</td>
                  </tr>
                ))}
              </tbody>
              {/* Table Foot */}
              <tfoot>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                </tr>
              </tfoot>
            </table>
          )}
        </div>
      </div>
    </div>

  );
}

export default SubscriberDetails;
