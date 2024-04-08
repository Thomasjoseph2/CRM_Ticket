import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import toast from "react-hot-toast";

const UpdateUserModal = ({
  isOpen,
  setUpdateUserModalOpen,
  user,
  setRefresher,
}) => {
  // Initialize state with user data
  const [userData, setUserData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  // Update state when user data changes
  useEffect(() => {
    setUserData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
    });
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.name.trim() ||
      !userData.email.trim() ||
      !userData.phone.trim() ||
      !userData.address.trim()
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }
    try {
      const updatedUser = { id: user._id, ...userData };
      // Send POST request to update user
      const response = await axios.post("/update-customer", updatedUser);
      if (response.status === 200) {
        toast.success("user updated successfully");
        setRefresher(Date.now());
        setUpdateUserModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("User updation failed");
    } finally {
      setUserData({
        name: "",
        email: "",
        phone: "",
        address: "",
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
      borderRadius: "8px",
      backgroundColor: "rgb(17 24 39)",
      width: "70%",
      height: "70%",
    },
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} ariaHideApp={false}>
      <div className=" p-6 bg-gray-800 rounded-lg">
        <h2 className="text-lg font-bold mb-4 text-white">Update User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1 text-white">
              Name:
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
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
              value={userData.email}
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
              value={userData.phone}
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
              value={userData.address}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-[#00df9a] text-white py-2 px-4 rounded-md mr-2 hover:bg-green-600"
          >
            Submit
          </button>
          <button
            onClick={() => setUpdateUserModalOpen(false)}
            className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          >
            Close
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
