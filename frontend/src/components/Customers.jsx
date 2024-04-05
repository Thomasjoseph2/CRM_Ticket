import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import AddCustomerModal from "../modals/CustomerModal";
import axios from "axios";
import toast from "react-hot-toast";
import SendEmailModal from "../modals/SendEmailModal";
import UpdateUserModal from "../modals/UpdateUserModal";

const Customers = () => {
  const [showModal, setShowModal] = useState(false);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [updateUserModalOpen, setUpdateUserModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [refresher, setRefresher] = useState(Date.now());

  const fetchData = async () => {
    try {
      const productResponse = await axios.get("/get-products");
      setProducts(productResponse?.data?.products);

      const customerResponse = await axios.get("/get-customers");
      setCustomers(customerResponse?.data?.customers);
    } catch (error) {
      toast.error("Something went wrong...");
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [refresher]);

  const handleSendEmail = (email, name) => {
    setSelectedCustomerEmail(email);
    setCustomerName(name);
    setIsEmailModalOpen(true);
  };

  const handleUpdateClick = (user) => {
    setSelectedCustomer(user);
    setUpdateUserModalOpen(true);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
    },
    {
      name: "Products",
      selector: (row) =>
        row.products.map((product) => product.title).join(", "),
    },
    {
      name: "Actions",
      cell: (row) => (
        <div className="space-x-2">
          <button
            className="bg-[#00df9a] hover:bg-blue-700 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleUpdateClick(row)}
          >
            Update User
          </button>
          <button
            className="bg-[#00df9a] hover:bg-blue-700 text-white py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={() => handleSendEmail(row.email, row.name)}
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
    pagination: {
      style: {
        backgroundColor: "rgb(17 24 39)",
        color: "#00df9a",
        fontSize: "14px",
        borderColor: "white",
        borderWidth: "1px",
      },
    },
  };

  return (
    <>
      <div className="flex justify-between">
        <button
          className="bg-[#00df9a] p-2 ml-10 mt-10"
          onClick={() => setShowModal(true)}
        >
          ADD CUSTOMER
        </button>

        <input
          type="text"
          placeholder="Search..."
          className="p-2 mr-10 mt-10 rounded-md border border-gray-400 focus:outline-none"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="m-10">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={filteredCustomers}
          highlightOnHover
          responsive
          pagination
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15]}
        />
      </div>

      <AddCustomerModal
        showModal={showModal}
        setShowModal={setShowModal}
        products={products}
        setRefresher={setRefresher}
      />

      <SendEmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        recipientEmail={selectedCustomerEmail}
        customerName={customerName}
      />
      <UpdateUserModal
        isOpen={updateUserModalOpen}
        setUpdateUserModalOpen={setUpdateUserModalOpen}
        user={selectedCustomer}
        setRefresher={setRefresher}
      />
    </>
  );
};

export default Customers;
