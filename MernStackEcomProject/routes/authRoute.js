import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controller/authController.js";
import { isAdmin, requireSignIn } from "../middleweres/authMiddlewere.js";

// router object
const router = express.Router();

//routing
//register user || method post
router.post("/register", registerController);
//LOGIN || POST
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

//test route
router.get("/test", requireSignIn, testController);

//protected User route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
