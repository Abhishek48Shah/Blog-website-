import express from "express";
import {
  createPostController,
  editBlogController,
  deleteBlogController,
  getUserContentController,
  commentsController,
} from "../controllers/userActionControllers/actionController.js";
import {
  createAccountController,
  userLoginController,
} from "../controllers/userAccountControllers/accountController.js";
import { apiVerify } from "../middleware/middleware.js";
const route = express.Router();
route.get("/user/blog", apiVerify, getUserContentController);
route.post("/account/create", createAccountController);
route.post("/account/login", userLoginController);
route.post("/blog/create", apiVerify, createPostController);
route.patch("/blog/edit/:blogId", apiVerify, editBlogController);
route.delete("/blog/delete/:blogId", apiVerify, deleteBlogController);
route.post("/blog/comment/:blogId", apiVerify, commentsController);
export default route;
