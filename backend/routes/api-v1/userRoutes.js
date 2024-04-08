// userRoutes.js

import express from "express";
import { protect, loginBlockCheck } from "../../middlewares/authMiddleware.js";
import {
  registerUser,
  authUser,
  logout,
  addProduct,
  addCustomer,
  getCustomers,
  addEmployees,
  getEmployees,
  sendEmail,
  updateCustomer,
  getproducts,
  assignTask
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

router.post(
  "/add-product",
  addProductValidation,
  protect,
  validate,
  addProduct
);

router.post(
  "/add-customer",
  addCustomerValidation,
  protect,
  validate,
  addCustomer
);

router.post(
  "/add-employees",
  addEmployeeValidation,
  protect,
  validate,
  addEmployees
);

router.post(
  "/add-employees",
  addEmployeeValidation,
  protect,
  validate,
  addEmployees
);

router.post("/update-customer", protect, updateCustomer);

router.post("/send-mail", protect, sendEmail);

router.post("/assign-task", protect, assignTask);


router.get("/get-products", protect, getproducts);

router.get("/get-customers", protect, getCustomers);

router.get("/get-employees", protect, getEmployees);

router.post("/logout", logout);

export default router;
