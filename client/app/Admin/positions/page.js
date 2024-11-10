"use client";
import React, { useEffect, useState } from "react";
import axios from "@/app/instance";
import Ham from "../../(components)/Ham";
import BottomNavbar from "../../(components)/BottomNavbar";

function Positions() {
  const controller = "positions";
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    position_id: "",
    position_name: "",
    position_rank: "",
    gross_wallet: "",
  });
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/${controller}/getall`
      );
      const results = response.data;
      console.log(results);
      setTableData(results);
    } catch (error) {
      console.error("Error fetching incentive data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = (row) => {
    setFormData({ ...row }); // Set form data to the copied row
    setIsEditing(true); // Switch to editing mode
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${controller}/update`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/${controller}/add`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Clear form and refetch data
      setFormData({
        position_id: "",
        position_name: "",
        position_rank: "",
        gross_wallet: "",
      });
      setIsEditing(false); // Reset editing state
      fetchData();
    } catch (error) {
      console.error("Error adding/updating incentive:", error);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen overflow-y-scroll">
        <Ham />
        <div className="flex flex-col overflow-y-scroll text-3xl">
          <div className="overflow-x-hidden max-h-[95vh]">
            <div className="inline-block min-w-full py-2">
              <div className="overflow-x-auto">
                <form onSubmit={handleSubmit}>
                  <table className="table table-pin-rows table-pin-cols text-center text-xs">
                    <thead>
                      <tr className=" pl-4 pr-4 ">
                        <th >Name</th>
                        <th className=" pl-4 pr-4 ">Rank</th>
                        <th>Gross Wallet</th>
                        <th>&nbsp;</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <input
                            type="text"
                            name="position_name"
                            value={formData.position_name}
                            onChange={handleInputChange}
                            placeholder="Name"
                            className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="position_rank"
                            value={formData.position_rank}
                            onChange={handleInputChange}
                            placeholder="Rank"
                            className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="gross_wallet"
                            value={formData.gross_wallet}
                            onChange={handleInputChange}
                            placeholder="Amount"
                            className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                          />
                        </td>
                        <td>
                          <button
                            type="submit"
                            className="btn btn-outline btn-accent"
                          >
                            {isEditing ? "Update" : "Add"}
                          </button>
                        </td>
                      </tr>
                      {tableData.map((row ) => (
                        <tr key={row.position_id}>
                          <td>{row.position_name}</td>
                          <td>{row.position_rank}</td>
                          <td>{row.gross_wallet}</td>
                          <td>
                            <span
                              onClick={() => handleEdit(row)}
                              className="btn btn-outline btn-accent"
                            >
                              Edit
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                      <th>SL</th>
                        <th>Name</th>
                        <th>Rank</th>
                        <th>Gross Wallet</th>
                        <th></th>
                      </tr>
                    </tfoot>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-16 bg-[#4F95FF] fixed z-10 bottom-0 flex justify-between items-center px-5">
          <BottomNavbar />
        </div>
      </div>
    </>
  );
}

export default Positions;