import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddCustomerModal from "../modals/CustomerModal";
import axios from "axios";
import toast from "react-hot-toast";
const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("/get-products");
      setProducts(response.data.products);
    } catch (error) {
      toast.error("something went wrong...");
      console.error("Error fetching product:", error);
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
      selector: (row) => row.products,
    },
  ];
  const dummydata = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      address: "123 Main St, City",
      products: ["Product 1", "Product 2"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "9876543210",
      address: "456 Elm St, Town",
      products: ["Product 3", "Product 4"],
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
            data={dummydata}
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
