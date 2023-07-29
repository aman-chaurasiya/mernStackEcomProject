import express from "express";
import { isAdmin, requireSignIn } from "./../middleweres/authMiddlewere.js";
import {
  categoryController,
  createCategoryController,
  deleteCategoryController,
  singleCategoryController,
  updateCategoryController,
} from "../controller/categoryController.js";
const router = express.Router();

//routes
//create-category
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//update category
router.put(
  "/update-category/:_id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//get all category

router.get("/get-category", categoryController);

//get single category
router.get("/single-category/:slug", singleCategoryController);

//delete category

router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);
export default router;
