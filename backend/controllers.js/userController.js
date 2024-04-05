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

// Backend - Controller
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

// Backend - Controller
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

// Get user profile controller
// Route: GET /api/users/get-profile
// Access: Private (requires authentication)
const getProfile = async (req, res) => {
  try {
    // Extracting userId from the request body
    const user = await UserService.getUser(req.user.userId);
    // Sending the response based on the result
    res.status(user.statusCode).json({ user: user.user });
  } catch (error) {
    // Handling errors and logging them
    console.log(error, "get profile controller");
    logger.error("Get user profile error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "get profile controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    // Extracting userId from the request body
    const products = await UserService.getProducts();
    // Sending the response based on the result
    res.status(products.statusCode).json({ products: products.products });
  } catch (error) {
    // Handling errors and logging them
    console.log(error, "get products controller");
    logger.error("Get user products error", {
      message: error.message,
      stack: error.stack,
      additionalInfo: "get products controller",
    });

    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

//logout expiring the jwt
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

// Exporting the controllers
export {
  authUser,
  getProfile,
  logout,
  registerUser,
  addProduct,
  getProduct,
  addCustomer,
  getCustomers,
  addEmployees,
  getEmployees,
};
