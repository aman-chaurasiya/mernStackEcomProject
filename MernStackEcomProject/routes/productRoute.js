import express from "express";
import { isAdmin, requireSignIn } from "./../middleweres/authMiddlewere.js";
import { createProductController } from "../controller/productController.js";
const router = express.Router();
import formidable from "express-formidable";

//Route create product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

export default router;
