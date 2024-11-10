"use client";
import React, { useEffect, useState } from "react";
import axios from "@/app/instance";
import Ham from "../../(components)/Ham";
import BottomNavbar from "../../(components)/BottomNavbar";

function Incentive() {
  const controller = "incentives";
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
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
        id: "",
        name: "",
        description: "",
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
                  <table className="table table-md table-pin-rows table-pin-cols text-center text-xs">
                    <thead>
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder="Incentives Name"
                            className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            placeholder="Incentives Description"
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
                      {tableData.map((row, index) => (
                        <tr key={row.id}>
                          <td>{index + 1}</td> {/* Displaying index as SL */}
                          <td>{row.name}</td>
                          <td>{row.description}</td>
                          <td>
                            <button
                              onClick={() => handleEdit(row)}
                              className="btn btn-outline btn-accent"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>SL</th>
                        <th>Name</th>
                        <th>Description</th>
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

export default Incentive;
