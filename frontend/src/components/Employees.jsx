import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import axios from "axios";
const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [refresher,setRefresher]=useState(Date.now())
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
      },
    },
    cells: {
      style: {
        borderColor: "white",
        borderWidth: "1px",
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
      name: "address",
      selector: (row) => row.address,
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
      setRefresher(Date.now())
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
      </div>
    </div>
  );
};

export default Products;
