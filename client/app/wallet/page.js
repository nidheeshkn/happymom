"use client";
import React, { useEffect,  useState } from "react";
import axios from "@/app/instance";


import Ham from "@/app/(components)/Ham";
import BottomNavbar from "@/app/(components)/BottomNavbar";

function Wallet() {
  const [wallet, setWallet] = useState([]);
  const [userwallet, setUserWallet] = useState({});

  // const [link, setLink] = useState("");
  // const router = useRouter();

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/myWallet`
        );

        // console.log(response.data);
        console.log(response.data);

        setWallet(response.data.my_wallet_data);
        setUserWallet(response.data.subscriber_data);

      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="w-full min-h-screen  overflow-y-scroll justify-center">
      <Ham/>
      <div className=" p-2">
        {userwallet ? (
          <>
            <div className="w-90 flex justify-center items-center mt-[2rem]">
              <div className="w-full  flex flex-col justify-center h-[28vh] bg-blue-500 rounded-md px-5">
                <div className="mt-1 text-[1rem] text-white font-semibold">
                  {Number(userwallet.wallet_balance).toFixed(2)} ₹
                </div>

                <div className="text-white text-sm">Gross Balance</div>
                <div className="mt-1 text-[1rem] text-white font-semibold">
                  {Number(userwallet.wallet_balance).toFixed(2)} ₹
                </div>

                <div className="text-white text-sm">Total Balance</div>
                <div className="mt-1 text-[1rem] text-white font-semibold">
                  {Number(userwallet.wallet_balance).toFixed(2)} ₹
                </div>

                <div className="text-white ">Redeemable</div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className="">
          {wallet ? <>{console.log(wallet)}</> : <></>}

          <div className="flex flex-col overflow-y-scroll">
            <div className="overflow-x-hidden max-h-[45vh]">
              <div className="inline-block min-w-full py-2">
                {wallet.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      {/* head */}
                      <thead>
                        <tr>
                          <th className="w-52">Description</th>
                          <th className=" p-1 w-32">Date</th>
                          <th className="w-16">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wallet.map((row) => (
                          <tr key={row.id}>
                            <td>
                              <div className="flex items-center gap-3">
                              {row.description}
                              </div>
                            </td>
                            <td className=" p-1">{row.createdAt.split("T")[0]}</td>
                            <td> {row.credit}</td>
                          </tr>
                        ))}
                      </tbody>
                      {/* foot */}
                      <tfoot>
                        <tr>
                        <th>Description</th>
                          <th className=" p-1 w-32">Date</th>
                          <th>Amount</th>
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
    </div>
  );
}

export default Wallet;