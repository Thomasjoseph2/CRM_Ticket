import { query } from "express";
import logger from "../config/logger.js";
import UserService from "../services/UserService.js";

// register user controller
// Route: POST /api/users/register
// Access: Public

const registerUser = async (req, res) => {
  try {
    const result = await UserService.registerUser(req.body, res);
    res.status(200).json(result);
  } catch (error) {
    // Handling errors and logging them
    console.log(error, "registration function");
    logger.error("Registration error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in auth controller",
    });
  }
};

// add customer controller
// Route: POST /api/users/add-customer
// Access: Public

const addCustomer = async (req, res) => {
  try {
    const result = await UserService.addCustomer(req.body);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.log(error, "addCustomer function");
    logger.error("addCustomer error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in addcustomer controller",
    });
    res.status(500).json({ error: "Failed to add customer" });
  }
};

// Controller for adding new employees
// Route: POST /api/users/add-employees
// Access: Public

const addEmployees = async (req, res) => {
  try {
    const result = await UserService.addEmployee(req.body);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.log(error, "addemployees function");
    logger.error("addemployees error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in addemployees controller",
    });
    res.status(500).json({ error: "Failed to add employees" });
  }
};

// Auth user controller and token setter
// Route: POST /api/users/auth
// Access: Public

const authUser = async (req, res) => {
  try {
    // Extracting email and password from the request body
    const { email, password } = req.body;

    // Calling the userLogin function from the UserService
    const result = await UserService.userLogin(email, password, res);

    // Sending the response based on the result
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    // Handling errors and logging them
    console.log(error, "auth user controller");

    logger.error("Authentication error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in auth controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for retrieving products
// Route: GET /api/users//get-products
// Access: Public

// const getProduct = async (req, res) => {
//   try {
//     // Extracting userId from the request body
//     const products = await UserService.getProducts();
//     // Sending the response based on the result
//     res.status(products.statusCode).json({ products: products.products });
//   } catch (error) {
//     // Handling errors and logging them
//     console.log(error, "get products controller");
//     logger.error("Get user products error", {
//       message: error.message,
//       stack: error.stack,
//       additionalInfo: "get products controller",
//     });

//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// Controller for retrieving employees
// Route: GET /api/users/get-employees
// Access: Public

const getEmployees = async (req, res) => {
  try {
    // Extracting userId from the request body
    const employee = await UserService.getEmployee();
    // Sending the response based on the result
    res.status(employee.statusCode).json({ employee: employee.employee });
  } catch (error) {
    // Handling errors and logging them
    console.log(error, "get employee controller");
    logger.error("Get user employee error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "get employee controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller for retrieving customers
// Route: GET /api/users/get-customers
// Access: Public
const getCustomers = async (req, res) => {
  try {
    // Extracting userId from the request body
    const customers = await UserService.getCustomers();
    // Sending the response based on the result
    res.status(customers.statusCode).json({ customers: customers.customers });
  } catch (error) {
    // Handling errors and logging them
    console.log(error, "get customers controller");
    logger.error("Get user customers error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "get customers controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Controller for adding a new product
// Route: POST /api/users/add-product
// Access: Public
const addProduct = async (req, res) => {
  try {
    // Extracting name, description, and price from the request body
    const { title, description, price } = req.body;
    const lowerCaseTitle = title.toLowerCase();
    // Calling the addProduct method from the UserService
    const result = await UserService.addProduct(
      lowerCaseTitle,
      description,
      price
    );

    // Sending the response based on the result
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.error(error, "add product controller");
    // Handling errors and logging them
    logger.error("Error in addProduct controller", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "Error occurred while adding product",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller for logging out user and expiring JWT
// Route: POST /api/users/logout
// Access: Public
const logout = async (req, res) => {
  try {
    res.cookie("userjwt", "", { httpOnly: true, expires: new Date(0) });

    res.status(200).json({ message: "user logged out" });
  } catch (error) {
    console.log(error, "logout controller");
    logger.error("Error in logout", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error occured during logout",
    });
  }
};

// Controller for sending email
// Route: POST /api/users/send-email
// Access: Public
const sendEmail = async (req, res) => {
  try {
    const result = await UserService.sendMail(req.body,req.body.recipientEmail);
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.log(error, "sendEmail function");
    logger.error("send email error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in email controller",
    });
  }
};
// Controller for updating customer information
// Route: PUT /api/users/update-customer
// Access: Public
const updateCustomer = async (req, res) => {
  try {
    const { id, name, email, phone, address } = req.body;
    const result = await UserService.updateCustomer(id, {
      name,
      email,
      phone,
      address,
    });
    res.status(result.statusCode).json(result.data);
  } catch (error) {
    console.log(error, "update customer controller");
    logger.error("Update customer error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "Error in update customer controller",
    });
    res.status(500).json({ error: "Failed to update customer" });
  }
};

//planing to convert this pagination and search logic into a middleware or common function
//can reuse this function in that way .

const getproducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let query;

    if (req.query.search) {
      query = { title: { $regex: req.query.search, $options: "i" } };
    } else {
      query = {};
    }
    const productCount = await UserService.getProductCount(query);
    const products = await UserService.getProducts(limit, startIndex, query);
    const results = {};
    results.results = products?.products;
    results.productCount = productCount;
    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }
    if (endIndex < productCount) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }
    res.status(products.statusCode).json({ results });
  } catch (error) {
    console.log(error);
  }
};

const assignTask = async (req, res) => {
  try {
    const result = await UserService.sendMail(req.body, req.body.employee.email);
    const task=await UserService.addTask(req.body)
    res.status(200).json({
      mail: result,
      task: task,
    });
  } catch (error) {
    console.log(error, "assignTask function");
    logger.error("assign task error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "error in assignTask controller",
    });
  }
};

// Exporting the controllers
export {
  authUser,
  logout,
  registerUser,
  addProduct,
  addCustomer,
  getCustomers,
  addEmployees,
  getEmployees,
  sendEmail,
  updateCustomer,
  getproducts,
  assignTask,
};
