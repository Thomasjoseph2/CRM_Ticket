import React from "react";
import Modal from "react-modal";
import Select from "react-select";
import { useEffect, useState } from "react";

const AddCustomerModal = ({ showModal, setShowModal, products }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    products: [],
  });
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      backgroundColor: "rgb(17 24 39)",
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleProductChange = (selectedProducts) => {
    setFormData((prevState) => ({
      ...prevState,
      products: selectedProducts.map((product) => product.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowModal(false);
  };
  const productOptions = products.map((product) => ({
    value: product._id,
    label: product.title,
  }));
  return (
    <Modal isOpen={showModal} style={customStyles} ariaHideApp={false}>
      <div className="p-6 bg-gray-800 w-96 rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-white">Add Customer</h2>
        <form onSubmit={handleSubmit}>
          {" "}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Phone:
            </label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Address:
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Products:
            </label>
            <Select
              isMulti
              options={productOptions}
              onChange={handleProductChange}
            />
          </div>{" "}
          <button
            type="submit"
            className="bg-[#00df9a] text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600"
          >
            Submit
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default AddCustomerModal;
