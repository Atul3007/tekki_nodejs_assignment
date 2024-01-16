const express = require('express');
const { getAll, createBlog, updateBlog, deleteBlog } = require('../controller/blogController');
const { requireSignin } = require('../middlewares/atuhMiddleware');
const blogRoutes = express.Router();


blogRoutes.get('/all-blog',getAll);
blogRoutes.post('/post-blog/:userid',requireSignin,createBlog);
blogRoutes.patch('/edit-blog/:userid/:blogid',requireSignin,updateBlog);
blogRoutes.delete('/delete-blog/:userid/:blogid',requireSignin,deleteBlog);

module.exports = blogRoutes;