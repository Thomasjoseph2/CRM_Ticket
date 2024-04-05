import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import axios from "axios";
const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/get-products");
      setData(response.data)
    } catch (error) {
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
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Price",
      selector: (row) => row.price,
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
    try {
      const response = await axios.post("/add-product", formData);
      console.log("Product added:", response.data);
      setFormData({
        title: "",
        description: "",
        price: "",
      });
      setShowModal(false);
      toast.success("product added successfully");
    } catch (error) {
      setFormData({
        title: "",
        description: "",
        price: "",
      });
      toast.error(error.response.data.error);
      console.error("Error adding product:", error);
    }
    setShowModal(false); // Close the modal after adding the product
  };

  return (
    <div>
      <button
        className="bg-[#00df9a] p-2 ml-10 mt-10"
        onClick={() => setShowModal(true)}
      >
        ADD PRODUCT
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-start bg-black bg-opacity-50">
          <div className="bg-gray-800 rounded-lg p-8 max-w-md mx-36">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1 text-white">Name:</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">Description:</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 text-white">Price:</label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
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
        <DataTable customStyles={customStyles} columns={columns} data={data?.products} />
      </div>
    </div>
  );
};

export default Products;
