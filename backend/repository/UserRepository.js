import User from "../models/userModel.js";
import logger from "../config/logger.js";
import Product from "../models/productModel.js";
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

  async addAddress(userId, address) {
    try {
      const user = await User.findById(userId);

      if (!user) {
        throw new Error("User not found");
      }

      user.address = address;
      await user.save();
    } catch (error) {
      logger.error("Error in addAddress:", {
        message: error.message,
        stack: error.stack,
        additionalInfo: "Error in addAddress:",
      });
      throw new Error("Failed to add user's address");
    }
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
}

export default new UserRepository();
