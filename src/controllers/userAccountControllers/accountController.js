import { passwordHash } from "../../PasswordHash/hashPassword.js";
import expressAsyncHandler from "express-async-handler";
import { userValidation } from "../../Validation/validation.js";
import bcrypt from "bcrypt";
import {
  createAccountModel,
  getUserByEmail,
} from "../../models/userAccountModel/accountModel.js";
// for creating users accounts------------------------
export const createAccountController = expressAsyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const isValidate = userValidation.validate({ name, email, password });
  if (!isValidate) {
    throw new ValidationError("Invalid user informations", 400);
  }
  const hashedPassword = await passwordHash(password);
  if (!hashedPassword) {
    console.log("Error hashing password");
    return;
  }
  const response = await createAccountModel(name, email, hashedPassword);
  res
    .status(201)
    .json({ success: response, message: "Successfully created user Account" });
});
// for user login ------------------------------------
export const userLoginController = expressAsyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ValidationError("Invalid user informations", 400);
  }
  const user = await getUserByEmail(email);
  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "10m",
      });
      const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      res.status(200).json({
        success: true,
        message: "Login successfull",
        token: accessToken,
      });
    }
  } else {
    throw new ValidationError("Invalid email or password", 400);
  }
});
