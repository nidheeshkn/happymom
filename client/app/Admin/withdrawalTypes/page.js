"use client";
import React, { useEffect, useState } from "react";
import axios from "@/app/instance";
import Ham from "../../(components)/Ham";
import BottomNavbar from "../../(components)/BottomNavbar";
import { RiAddLine, RiCloseLine, RiEdit2Line, RiLoopRightLine, RiPlayListAddLine } from "@remixicon/react";

function WithdrawalTypes() {
  const controller = "withdrawalRequestTypes";
  const [tableData, setTableData] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    added_by: "",
    active: "",
  });

  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const [displayForm, setDisplayForm] = useState(false); // State to track editing mode

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
    setDisplayForm(true);
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
        title: "",
        description: "",
        added_by: "",
        active: "",
      });
      setIsEditing(false); // Reset editing state
      setDisplayForm(false);
      fetchData();
    } catch (error) {
      console.error("Error adding/updating incentive:", error);
    }
  };

  const resetFromData = async () => {
    setFormData({
      id: "",
      title: "",
      description: "",
      added_by: "",
      active: "",
    });
  }

  return (
    <>
      <div className="w-full min-h-screen overflow-y-scroll">
        <Ham />
        <div className="flex flex-col overflow-y-scroll text-3xl">
          <div className="overflow-x-hidden max-h-[95vh]">
            <div className="inline-block min-w-full py-2">
                <form onSubmit={handleSubmit}>
                  <table className="table table-pin-rows table-pin-cols text-center text-xs">
                    <thead>
                      <tr className=" text-lg">
                        <th className="p-2">title</th>
                        <th className="p-2">description</th>
                        <th className="p-2">active</th>
                        <th className="p-2"> 
                          {displayForm===true?
                          <span
                          onClick={() => {
                            setDisplayForm(false);
                            resetFromData();
                            setIsEditing(false); 
                          }}
                          className="btn btn-outline btn-accent "
                        >
                          <RiCloseLine />
                        </span>:
                        <span
                        onClick={() => {
                          setDisplayForm(true);
                          resetFromData();
                          setIsEditing(false); 
                        }}
                        className="btn btn-outline btn-accent "
                      >
                        <RiPlayListAddLine />
                      </span>
                        }
                          
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {displayForm ? (
                        <tr>
                          <td>
                            <input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleInputChange}
                              placeholder="title"
                              className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="description"
                              value={formData.description}
                              onChange={handleInputChange}
                              placeholder="description"
                              className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              name="active"
                              value={formData.active}
                              onChange={handleInputChange}
                              placeholder="active"
                              className="input input-bordered input-accent w-full max-w-xs p-1 text-center"
                            />
                          </td>
                          <td>
                            <button
                              type="submit"
                              className="btn btn-outline btn-accent"
                            >
                              {isEditing ? <RiLoopRightLine /> : <RiAddLine />}
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <></>
                      )}
                      {tableData.map((row) => (
                        <tr key={row.id}>
                          <td>{row.title}</td>
                          <td>{row.description}</td>
                          <td>{row.active}</td>
                          <td>
                            <span
                              onClick={() => handleEdit(row)}
                              className="btn btn-outline btn-accent"
                            >
                              <RiEdit2Line />
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <th>title</th>
                        <th className=" pl-4 pr-4 ">description</th>
                        <th>active</th>
                        <th>&nbsp;</th>
                      </tr>
                    </tfoot>
                  </table>
                </form>
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

export default WithdrawalTypes;
