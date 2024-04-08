import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import TaskAssignModal from "../modals/TaskAssignModal";
import axios from "axios";
const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [refresher, setRefresher] = useState(Date.now());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [employee, setEmployee] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    fetchData();
  }, [refresher]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/get-employees");
      setEmployees(response.data);
    } catch (error) {
      toast.error("something went wrong");
      console.error("Error fetching product:", error);
    }
  };

  const handleAssignTask = (row) => {
    setEmployee(row);
    setIsTaskModalOpen(true)
  };
  const customStyles = {
    rows: {
      style: {
        backgroundColor: "rgb(17 24 39)",
        color: "white",
      },
    },
    headCells: {
      style: {
        backgroundColor: "rgb(17 24 39)",
        color: "#00df9a",
        fontSize: "14px",
        borderColor: "white",
        borderWidth: "1px",
        alignItems: "center",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        borderColor: "white",
        borderWidth: "1px",
        alignItems: "center",
        justifyContent: "center",
      },
    },
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Task Details",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <button
            className=" bg-[#00df9a] hover:bg-blue-700 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleSendEmail(row)}
          >
            View Tasks and Status
          </button>
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-center">
          <button
            className=" bg-[#00df9a] hover:bg-blue-700 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleAssignTask(row)}
          >
            Assign Task
          </button>
        </div>
      ),
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.address
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      const response = await axios.post("/add-employees", formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      setShowModal(false);
      toast.success("employee added successfully");
      setRefresher(Date.now());
    } catch (error) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
      toast.error(error.response.data.error);
      console.error("Error adding product:", error);
    }
    setShowModal(false);
  };

  return (
    <div>
      <button
        className="bg-[#00df9a] p-2 ml-10 mt-10"
        onClick={() => setShowModal(true)}
      >
        ADD EMPLOYEE
      </button>
      <h1 className="text-red-600 p-2 ml-9 ">
        view tasks feature under development...
      </h1>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-start bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-8 w-full sm:w-[40%] sm:mx-44">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-white">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="bg-[#00df9a] text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Add
              </button>
              <button
                onClick={() => setShowModal(false)}
                type="submit"
                className="bg-red-300 text-white py-2 px-4 rounded-md ml-2 hover:bg-green-600"
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}
      <div className="m-10">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={employees?.employee}
        />
        <TaskAssignModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          employee={employee}
        />
      </div>
    </div>
  );
};

export default Products;
