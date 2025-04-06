import dotenv from "dotenv";
import { ValidationError } from "../../errorHandler/errorhandle.js";
import {
  createPostModel,
  editBlogModel,
  deleteBlogModel,
  getUserContentModel,
  commentsModel,
} from "../../models/userActionModel/actionModel.js";
import expressAsyncHandler from "express-async-handler";
dotenv.config();
//
//
//
//************For creating new Blog***********
//
//
export const createPostController = expressAsyncHandler(async (req, res) => {
  const user_id = req.ownerId;
  const { title, content } = req.body;
  if (!title || !content) {
    throw new ValidationError("Title and Content are required", 400);
  }
  const response = await createPostModel(title, content, user_id);
  res
    .status(200)
    .json({ success: response, message: "Successfully created the post" });
});
//
//
//
//******************For Editing blog dynamically***************
//
//
export const editBlogController = expressAsyncHandler(async (req, res) => {
  const user_id = req.ownerId;
  const blogId = req.params.blogId;
  const response = await editBlogModel(user_id, blogId, req.body);
  if (!response) {
    console.log(response);
  } else {
    res.status(200).json({
      success: response,
      message: "Successfully data has been edited",
    });
  }
});
//
//
//******************For deleting blog*****************
//
//
export const deleteBlogController = expressAsyncHandler(async (req, res) => {
  const user_id = req.ownerId;
  const blogId = req.params.blogId;
  const response = await deleteBlogModel(user_id, blogId);
  if (!response) {
    throw new Error("Internal server error");
  } else {
    res
      .status(200)
      .json({ success: true, message: "Successfully delete the blog" });
  }
});
export const getUserContentController = expressAsyncHandler(
  async (req, res) => {
    const userId = req.ownerId;
    const response = await getUserContentModel(userId);
    if (!response) {
      throw new Error("Internal server error");
    } else {
      console.log(response);
      res.status(200).json({
        success: true,
        message: "Successfully get the data",
        response: response,
      });
    }
  },
);
export const commentsController = expressAsyncHandler(async (req, res) => {
  const user_id = req.ownerId;
  const articles_id = req.params.blogId;
  const { content } = req.body;

  if (!user_id || !content || !articles_id) {
    console.log(user_id, content, articles_id);
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }
  const response = await commentsModel(user_id, content, articles_id);
  if (!response) {
    return res.status(401).json({ err: "Error while posting comments" });
  } else {
    res.status(200).json({
      success: true,
      message: "Successfully posted comments",
      response: response,
    });
  }
});
