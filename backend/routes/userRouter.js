import express from "express";
import expressAsyncHandler from "express-async-handler";
import crypto from "crypto";
import { isAuth } from "../middlewares/authMiddleware.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import sendEmail from "../utils/sendEmail.js";
const userRouter = express.Router();

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
userRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(user._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(401).json({ message: "invalid password or email" });
    }
  })
);

// @desc get user profile
// @route GET /profile
// @access private

userRouter.get(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user.id);
    if (user) {
      res.json({
        _id: user._id,
        email: user.email,
        name:user.name
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

// @desc Register a new user
// @route POST /api/users
// @access Public

userRouter.post(
  "/signup",
  expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(user._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400).json({ message: "Registration failed" });
    }
  })
);

// @desc Profile update
// @route PUT /api/profile
// @access private

userRouter.put(
  "/profile",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) user.password = req.body.password;

      const updatedUser = await user.save();

      const maxAge = 3 * 24 * 60 * 60;
      const token = generateToken(updatedUser._id);
      res.cookie("access_token", token, {
        httpOnly: true,
        maxAge: maxAge * 1000,
      });

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
      });
    } else {
      res.status(404).json({ message: "user doesn't found" });
    }
  })
);

// @desc for resetting password via forgot password method
// @route POST /api/users/forgot-password
// @access PRIVATE

userRouter.post(
  "/forgot-password",
  expressAsyncHandler(async (req, res) => {
    //  Get user based on the posted email

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404);
      throw new Error("No user found");
    }

    //  Generate the random token

    const resetToken = user.createResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    try {
      const resetUrl = `${req.protocol}://${req.get(
        "host"
      )}/api/users/reset-password/${resetToken}`;

      const message = `Use the token to reset the password\ntoken : ${resetToken}`;

      await sendEmail({
        email: req.body.email,
        subject: "Reset your password",
        message,
      });

      res.status(200).json({
        message: "Check your mail for reset the password",
      });
    } catch (error) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      throw new Error(
        "There was an error while sending the e-mail . try again"
      );
    }
  })
);

// @desc to the reset the password using the token
// @route PATCH /api/users/reset-password
// @access PRIVATE

userRouter.patch(
  "/reset-password",
  expressAsyncHandler(async (req, res) => {
    // Get the token from the user
    const { token, password } = req.body;

    const hashToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      passwordResetToken: hashToken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400);
      throw new Error("Token is invalid or expired ");
    }

    user.password = password;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save();

    const maxAge = 3 * 24 * 60 * 60;
    const jwtToken = generateToken(user._id);
    res.cookie("access_token", jwtToken, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });

    res.status(204).json({
      message: "Updated successfully",
    });
  })
);
userRouter.get(
  "/logout",
  expressAsyncHandler(async (req, res) => {
    const maxAge = 0;
    const token = generateToken("6781235678", "logout");
    res.cookie("access_token", token, {
      httpOnly: true,
      maxAge: maxAge,
    });
    res.json({
      message: "successfully logout in",
     
    });
  })
);
export default userRouter;
