import UserRepository from "../repository/UserRepository.js";
import logger from "../config/logger.js";
import { isStrongPassword } from "../utils/passwordValidator.js";
import generateToken from "../utils/generateNormalToken.js";
import nodemailer from "nodemailer";
class UserServices {
  static instance;

  constructor() {
    if (UserServices.instance) {
      return UserServices.instance;
    }

    UserServices.instance = this;
  }
  async registerUser({ name, email, password }, res) {
    try {
      if (!isStrongPassword(password)) {
        res
          .status(400)
          .json({ error: "Weak password. Please use a stronger password." });
        return;
      }
      const userExists = await UserRepository.findByEmail({ email });

      if (userExists) {
        res.status(409).json({ error: "User already exists" });
        return;
      } else {
        // Create a new user
        const user = await UserRepository.createUser({ name, email, password });

        if (user) {
          // Generate token and send response for successful registration
          generateToken(res, user._id, "user");
          return {
            statusCode: 201,
            data: {
              _id: user._id,
              name: user.name,
              email: user.email,
            },
          };
        }
      }
    } catch (error) {
      // Handle errors and log them
      console.log(error, "register user service");
      logger.error("Error in registerUser:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "User registration failed",
      });
    }
  }
  // Service method to handle user login
  async userLogin(email, password, res) {
    try {
      // Finding the user by email in the UserRepository
      const user = await UserRepository.findByEmail({ email });
      // Checking if the user exists, passwords match, and the user is verified
      if (user && (await UserRepository.matchPasswords(user, password))) {
        // Generating a token and sending it in the response
        generateToken(res, user._id, "user");

        // Returning success response with user details
        return {
          statusCode: 201,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
        };
      } else {
        // Returning unauthorized response for invalid email or password
        return {
          statusCode: 401,
          data: { message: "Invalid email or password" },
        };
      }
    } catch (error) {
      // Logging and throwing an error for failed user login
      console.log(error, "user login service");
      logger.error("Error in userLogin:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "User login failed",
      });
      throw new Error("User login failed");
    }
  }

  async getProducts() {
    try {
      const products = await UserRepository.getProducts();
      // Checking if the user exists
      if (products) {
        // Converting the user to an object and returning success response
        // const user = finduser.toObject();
        return { statusCode: 200, products };
      } else {
        // Throwing an error for user not found
        throw new Error("products not found");
      }
    } catch (error) {
      // Logging and throwing an error for failed user retrieval
      console.log(error, "get products service");
      logger.error("Error in getProducts:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error in getProducts:",
      });
      throw error;
    }
  }

  async getEmployee() {
    try {
      const employee = await UserRepository.getEmployee();
      // Checking if the employee exists
      if (employee) {
        return { statusCode: 200, employee };
      } else {
        // Throwing an error for user not found
        throw new Error("employee not found");
      }
    } catch (error) {
      // Logging and throwing an error for failed user retrieval
      console.log(error, "get employee service");
      logger.error("Error in getemployee:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error in getemployee:",
      });
      throw error;
    }
  }
  async getCustomers() {
    try {
      const customers = await UserRepository.getCustomers();
      // Checking if the user exists
      if (customers) {
        // Converting the user to an object and returning success response
        // const user = finduser.toObject();
        return { statusCode: 200, customers };
      } else {
        // Throwing an error for user not found
        throw new Error("customers not found");
      }
    } catch (error) {
      // Logging and throwing an error for failed user retrieval
      console.log(error, "get customers service");
      logger.error("Error in getcustomers:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error in getcustomers:",
      });
      throw error;
    }
  }
  async addProduct(title, description, price) {
    try {
      // Check if the product already exists
      const existingProduct = await UserRepository.findProductByName(title);
      if (existingProduct) {
        return {
          statusCode: 409, // Conflict status code for duplicate resource
          data: { error: "Product already exists" },
        };
      }

      // Create a new product object
      const product = { title, description, price };

      // Call the repository method to add the product
      const result = await UserRepository.createProduct(product);

      return result; // Return the result from the repository
    } catch (error) {
      console.error(error, "add product service");
      // Handling errors and logging them
      logger.error("Error in addProduct service", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while adding product",
      });

      throw new Error("Failed to add product");
    }
  }

  async addCustomer(customer) {
    try {
      const existingCustomer = await UserRepository.findCustomerPhone(
        customer.phone
      );
      if (existingCustomer) {
        return {
          statusCode: 409,
          data: { error: "Customer already exists" },
        };
      }

      const result = await UserRepository.createCustomer(customer);
      return result;
    } catch (error) {
      console.error(error, "add customer service");
      logger.error("Error in addCustomer service", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while adding customer",
      });
      throw new Error("Failed to add customer");
    }
  }

  async addEmployee(employee) {
    try {
      const existingEmployee = await UserRepository.findEmployeeByPhone(
        employee.phone
      );
      if (existingEmployee) {
        return {
          statusCode: 409,
          data: { error: "employee already exists" },
        };
      }

      const result = await UserRepository.createEmployee(employee);
      return result;
    } catch (error) {
      console.error(error, "add employee service");
      logger.error("Error in addemployee service", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while adding employee",
      });
      throw new Error("Failed to add employee");
    }
  }
  async sendMail(emailData) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.email",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailOptions = {
        from: {
          name: emailData.user,
          address: process.env.USER_EMAIL,
        },
        to: emailData.recipientEmail,
        subject: emailData.subject,
        text: "You are important for us",
        html: `<b>${emailData.message}</b>`,
      };

      return transporter.sendMail(mailOptions).then((res) => {
        return {
          statusCode: 200,
          data: { message: "successfully send mail" },
        };
      });
    } catch (error) {
      console.log(error);
      return {
        statusCode: 500,
        data: { error: "not able to send mail" },
      };
    }
  }
  async updateCustomer(id, customerData) {
    try {
      const updateCustomer = await UserRepository.updateCustomer(
        id,
        customerData
      );
      if (updateCustomer) {
        return {
          statusCode: 200,
          data: { message: "customer updated successfully" },
        };
      } else {
        throw new Error("customer not found");
      }
    } catch (error) {
      console.error(error, "update customer service");
      logger.error("Error in updateCustomer service", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error occurred while updating customer",
      });
      throw new Error("Failed to update customer");
    }
  }
}

// Exporting an instance of the UserServices class
export default new UserServices();
