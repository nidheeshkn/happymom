"use client";

import axios from "@/app/instance";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Ham from "@/app/(components)/Ham";

function EditProfile() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [toastText, setToastText] = useState("");
  const [toggle, setToggle] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/profile`
        );
        setFormData(response.data.my_data);
      } catch (error) {
        console.error(error);
        setToastText("Failed to load profile data");
        setToast(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/subscriber/update_me`,
        formData
      );
      if (response.data.status === "success") {
        setToastText("Successfully Updated...");
        setToggle(false);
        setTimeout(() => setToast(false), 5000);
        router.push("/subscriber/userprofile");
      } else {
        setToastText("Failed to update details...");
      }
    } catch (error) {
      console.error(error);
      setToastText("Failed to update details...");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="w-full max-h-screen h-screen overflow-y-scroll">
      <div className="w-full">
        <Ham />
      </div>

      {toast && (
        <div className="toast toast-middle toast-center z-50">
          <div className="alert alert-info">
            <span>{toastText}</span>
          </div>
        </div>
      )}
      {toggle && (
        <div className="w-full h-[100vh] bg-slate-50 filter z-50 absolute top-0 flex justify-center items-center px-5">
          <div className="w-full h-[30vh] bg-slate-400 shadow">
            <div className="w-full bg-indigo-500 py-5 shadow flex justify-center items-center font-semibold text-white">
              Confirm Updating
            </div>
            <div className="w-full flex px-7 justify-between items-center mt-[3rem]">
              <button
                className="px-5 py-4 bg-red-500 text-white font-semibold rounded-md"
                onClick={() => setToggle(false)}
              >
                Cancel
              </button>
              <button
                className="px-5 py-4 bg-indigo-500 text-white font-semibold rounded-md"
                onClick={handleUpdate}
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-5 max-h-[34rem] overflow-y-scroll overflow-x-hidden ">
        {loading ? (
          <div className="text-center">Loading data...</div>
        ) : (
          Object.keys(formData).map((key) =>
            key !== "subscriber_id" &&
            key !== "parent_id" &&
            key !== "position_id" &&
            key !== "doj" &&
            key !== "validity_date" &&
            key !== "gross_wallet" &&
            key !== "wallet_balance" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            key !== "active" ? (
              <label key={key} className="">
                {key
                  .replace(/_/g, " ")
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
                <input
                  type="text"
                  name={key}
                  className="w-full py-2 mb-4"
                  defaultValue={formData[key]}
                  onChange={handleInputChange}
                />
              </label>
            ) : null
          )
        )}
      </div>
      <div className="w-full px-5 mt-3">
        <button
          onClick={() => setToggle(true)}
          className="py-2 w-full bg-[#4E95FF] font-semibold text-white rounded-md"
          disabled={loading}
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditProfile;
