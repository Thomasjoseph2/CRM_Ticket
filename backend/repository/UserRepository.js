import User from "../models/userModel.js";
import logger from "../config/logger.js";
import Product from "../models/productModel.js";
import Customer from "../models/customerModel.js";
import Employee from "../models/employeesModel.js";
class UserRepository {
  static instance;

  constructor() {
    if (UserRepository.instance) {
      return UserRepository.instance;
    }

    UserRepository.instance = this;
  }
  async createUser(userData) {
    return await User.create(userData);
  }

  async findByEmail(email) {
    try {
      return await User.findOne(email);
    } catch (error) {
      logger.error("Error in findByEmail:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to find user by email",
      });
      throw new Error("Failed to find user by email");
    }
  }

  async findCustomerPhone(phone) {
    try {
      return await Customer.findOne({ phone: phone });
    } catch (error) {
      logger.error("Error in find by phone:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to find  by phone",
      });
      throw new Error("Failed to find user by phone");
    }
  }
  async findEmployeeByPhone(phone) {
    try {
      return await Employee.findOne({ phone: phone });
    } catch (error) {
      logger.error("Error in find by phone:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to find  by phone",
      });
      throw new Error("Failed to find user by phone");
    }
  }
  async findProductByName(title) {
    try {
      return await Product.findOne({ title: title });
    } catch (error) {
      logger.error("Error in findByName:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to find user by name",
      });
      throw new Error("Failed to find user by name");
    }
  }

  async getProducts() {
    try {
      // Find all products and sort them based on the 'createdAt' field in descending order
      const products = await Product.find({}).sort({ createdAt: -1 });

      return products;
    } catch (error) {
      logger.error("Error in getProducts:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to fetch products",
      });
      throw new Error("Failed to fetch products");
    }
  }

  async getEmployee() {
    try {
      // Find all products and sort them based on the 'createdAt' field in descending order
      const employee = await Employee.find({}).sort({ createdAt: -1 });

      return employee;
    } catch (error) {
      logger.error("Error in getemployee:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to fetch employee",
      });
      throw new Error("Failed to fetch employee");
    }
  }
  async getCustomers() {
    try {
      // Find all products and sort them based on the 'createdAt' field in descending order
      // const customers = await Customer.find({}).sort({ createdAt: -1 });

      const customers = await Customer.find({}).populate({
        path: "products",
        select: "title _id",
      });

      return customers;
    } catch (error) {
      logger.error("Error in getcustomers:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to fetch customers",
      });
      throw new Error("Failed to fetch customers");
    }
  }
  async findUserByIdForMiddleWare(userId) {
    try {
      return await User.findById(userId).select("-password");
    } catch (error) {
      logger.error("Error in findUserByIdForMiddleWare:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to find user by ID for middleware",
      });
      throw new Error("Failed to find user by ID for middleware");
    }
  }

  async findUserById(userId) {
    try {
      return await User.findById(userId);
    } catch (error) {
      logger.error("Error in findUserById:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error in findUserById:",
      });
      throw new Error("Failed to find user by ID");
    }
  }

  async matchPasswords(user, enteredPassword) {
    try {
      return await user.matchPasswords(enteredPassword);
    } catch (error) {
      logger.error("Error in matchPasswords:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Failed to match passwords",
      });
      throw new Error("Failed to match passwords");
    }
  }
  async getUser(userId) {
    return await User.findById(userId);
  }

  async createProduct(productData) {
    try {
      // Create a new product using the Product model
      const product = await Product.create(productData);

      return {
        statusCode: 201,
        data: product, // Return the created product
      };
    } catch (error) {
      console.error(error, "create product repository");
      // Handling errors and logging them
      logger.error("Error in createProduct repository", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while creating product",
      });

      throw new Error("Failed to create product");
    }
  }

  async createCustomer(customerData) {
    try {
      // Create a new product using the Product model
      const customer = await Customer.create(customerData);

      return {
        statusCode: 201,
        data: customer, // Return the created customer
      };
    } catch (error) {
      console.error(error, "create customer repository");
      // Handling errors and logging them
      logger.error("Error in createcustomer repository", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while creating customer",
      });

      throw new Error("Failed to create customer");
    }
  }
  async createEmployee(employeeData) {
    try {
      // Create a new product using the Product model
      const employee = await Employee.create(employeeData);

      return {
        statusCode: 201,
        data: employee,
      };
    } catch (error) {
      console.error(error, "create employee repository");
      // Handling errors and logging them
      logger.error("Error in createemployee repository", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while creating employee",
      });

      throw new Error("Failed to create employee");
    }
  }
}

export default new UserRepository();
