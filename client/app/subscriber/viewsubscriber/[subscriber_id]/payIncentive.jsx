// "use client";

// // import axios from "@/app/instance";
// import React, { useEffect, useRef, useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// function PayIncentive() {
//     // const params = useParams();
//     // const amountRef = useRef();
//     // const incentiveTypeRef = useRef(); // Ref for incentive type
//     // const [incentiveTypes, setIncentiveTypes] = useState({});

//     // const [users_data, setUsersData] = useState({});
//     // const [subscriber_data, setSubscriberData] = useState({});
//     // const [toastMessage, setToastMessage] = useState(""); // State for toast message
//     // const [toastType, setToastType] = useState(""); // State for toast type (success/error)

//     // const [isAddIncentiveModalOpen, setIsAddIncentiveModalOpen] = useState(false); // State for add incentive modal

//     // const router = useRouter();

//     // useEffect(() => {
//     //     (async function () {
//     //         try {
//     //             setLoading(true);

//     //             const Incentive_res = await axios.get(
//     //                 `${process.env.NEXT_PUBLIC_BASE_URL}/incentives/getall`

//     //             );
//     //             console.log(Incentive_res.data);



//     //             setIncentiveTypes(Incentive_res.data);


//     //         } catch (err) {
//     //             console.error(err);
//     //             alert("An error occurred while fetching data.");
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     })();
//     // }, [params]);

//     // if (loading) return <div>Loading...</div>;



//     // const addIncentive = async () => {

//     //     console.log(users_data.id);

//     //     try {

//     //         console.log("trying to pay.... incentives");

//     //         const res = await axios.post(
//     //             `${process.env.NEXT_PUBLIC_BASE_URL}/incentives/pay`,
//     //             {
//     //                 user_id: subscriber_user_data.id,
//     //                 incentiveType: incentiveTypeRef.current.value, // Get the selected value
//     //                 amount: amountRef.current.value,
//     //             }
//     //         );

//     //         console.log(res.data);

//     //         if (res.data.message === "Incentives paid successfully") {
//     //             amountRef.current.value = "";
//     //             setToastMessage("Incentives paid successfully!");
//     //             setToastType("success");

//     //             // Automatically hide the toast after a few seconds
//     //             setTimeout(() => {
//     //                 setToastMessage("");
//     //                 setToastType("");
//     //                 setIsAddIncentiveModalOpen(false); // Close modal on success
//     //             }, 3000);
//     //         }
//     //     } catch (error) {
//     //         console.error(error);
//     //         alert("An error occurred while adding the incentive.");
//     //     }
//     // };

//     return (
//         <>
//             <div className="modal modal-open">
//                 <div className="modal-box">
//                     <h2 className="font-bold text-lg">Add Incentive</h2>
//                     <h2 className="font-bold text-lg">{subscriber_data.name}</h2>
//                    <select
//                         ref={incentiveTypeRef}
//                         className="select select-bordered w-full max-w-xs mt-2"
//                         defaultValue=""
//                     >
//                         <option value="" disabled>Select Incentive Type</option>
//                         {incentiveTypes.map((type) => (
//                             <option key={type.id} value={type.id}>
//                                 {type.name}
//                             </option>
//                         ))}
//                     </select>
//                     <input
//                         ref={amountRef}
//                         type="text"
//                         placeholder="Enter Amount"
//                         className="input input-bordered w-full max-w-xs mt-2"
//                     />
//                     <div className="modal-action">
//                         <button className="btn" onClick={addIncentive}>
//                             Add Incentive
//                         </button>
//                         <button className="btn" onClick={() => setIsAddIncentiveModalOpen(false)}>
//                             Cancel
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             {/* Toast Notifications */}
//             {
//                 toastMessage && (
//                     <div className={`toast toast-start toast-middle`}>
//                         <div className={`alert ${toastType === "success" ? "alert-success" : "alert-error"}`}>
//                             <span>{toastMessage}</span>
//                         </div>
//                     </div>
//                 )
//             }


//         </>
//     );
// }

// export default PayIncentive;