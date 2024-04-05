// userRoutes.js

import express from "express";
import { protect, loginBlockCheck } from "../../middlewares/authMiddleware.js";
import {
  registerUser,
  authUser,
  getProfile,
  addAddress,
  logout,
  addProduct,
  getProduct
} from "../../controllers.js/userController.js";
import {
  addAddressValidation,
  authUserValidation,
  addProductValidation,
  validate,
} from "../../middlewares/validationMiddleware.js";
const router = express.Router();

router.post("/register", registerUser);

router.post("/auth", authUserValidation, loginBlockCheck, validate, authUser);

router.get("/get-profile", protect, getProfile);

router.post("/add-product", addProductValidation, protect, addProduct);

router.get ('/get-products',protect,getProduct)

router.post(
  "/add-address",
  addAddressValidation,
  protect,
  validate,
  addAddress
);

router.post("/logout", logout);

export default router;
