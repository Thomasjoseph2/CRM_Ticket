import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddCustomerModal from "../modals/CustomerModal";
import axios from "axios";
import toast from "react-hot-toast";
const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const fetchData = async () => {
    try {
      const productResponse = await axios.get("/get-products");
      setProducts(productResponse.data.products);

      const customerResponse = await axios.get("/get-customers");
      setCustomers(customerResponse.data.customers);
    } catch (error) {
      toast.error("Something went wrong...");
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
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
    {
      name: "products",
      selector: (row) =>
        row.products.map((product) => product.title).join(", "),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleSendEmail(row.email)}
          >
            Edit User
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleSendEmail(row.email)}
          >
            Send Email
          </button>
        </div>
      ),
    },
  ];

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

  return (
    <>
      <div>
        <button
          className="bg-[#00df9a] p-2 ml-10 mt-10"
          onClick={() => setShowModal(true)}
        >
          ADD CUSTOMER
        </button>

        <div className="m-10">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={customers}
          />
        </div>
      </div>

      <AddCustomerModal
        showModal={showModal}
        setShowModal={setShowModal}
        products={products}
      />
    </>
  );
};

export default Customers;
