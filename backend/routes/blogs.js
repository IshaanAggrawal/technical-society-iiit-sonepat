// routes/blogs.js
import express from "express";
import multer from "multer";

import {getBlogID} from "../controllers/getBlogID.js";
import {postBlogComment} from "../controllers/postBlogComment.js";
import {postBlog} from "../controllers/postBlog.js";
import {getBlogs} from "../controllers/getBlogs.js";

const router = express.Router();multer({ dest: "uploads/" });


router.route('/').get(getBlogs).post(postBlog);
router.route('/:id').get(getBlogID).post(postBlogComment);


export default router;
