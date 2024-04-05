// userRoutes.js

import express from "express";
import { protect, loginBlockCheck } from "../../middlewares/authMiddleware.js";
import {
  registerUser,
  authUser,
  getProfile,
  logout,
  addProduct,
  getProduct,
  addCustomer,
  getCustomers,
  addEmployees,
  getEmployees
} from "../../controllers.js/userController.js";
import {
  authUserValidation,
  addProductValidation,
  addCustomerValidation,
  addEmployeeValidation,
  validate,
} from "../../middlewares/validationMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/auth", authUserValidation, loginBlockCheck, validate, authUser);

router.get("/get-profile", protect, getProfile);

router.post("/add-product", addProductValidation, protect,validate, addProduct);

router.post("/add-customer", addCustomerValidation, protect, validate,addCustomer);

router.post("/add-employees", addEmployeeValidation, protect,validate, addEmployees);

router.get("/get-products", protect, getProduct);

router.get("/get-customers", protect, getCustomers);

router.get("/get-employees", protect, getEmployees);


router.post("/logout", logout);

export default router;
