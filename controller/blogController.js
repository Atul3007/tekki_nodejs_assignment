const Blog = require("./../models/blogModel");

const getAll = async (req,res) => {
    try {
        const blogs = await Blog.find({}).populate('createdBy');
        res.status(200).json(blogs);
    } catch (error) {
        console.log({msg:"eroor in getting all blogs"})
    }
}

const createBlog = async (req, res) => {
    try {
        const { title, content, author } = req.body;
        const createdBy = req.params.userid;
        const newBlog = new Blog({
            title,
            content,
            author,
            createdBy
        });
        await newBlog.save();

        res.status(201).json({ message: "Blog created successfully!" });
    } catch (error) {
        console.error({ msg: "Error in posting blog", error });
        res.status(500).json({ error: "Internal Server Error" });
    }
}

const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogid;
        const { title, content, author } = req.body;

        if (!title && !content && !author) {
            res.status(200).json("Nothing to update!!!");
            return;
        }

        const blog = await Blog.findById(blogId).populate('createdBy');

        if (!blog) {
            res.status(404).json("Blog not found");
            return;
        }

        const userIdInBlog = blog.createdBy._id;
        const userIdInParam = req.params.userid;

        if (userIdInBlog.toString() === userIdInParam) {
            const editData = {
                title: title || blog.title,
                content: content || blog.content,
                author: author || blog.author
            };

            await Blog.findByIdAndUpdate(blogId, editData);
            res.status(200).json("Blog updated successfully!!!");
        } else {
            res.status(403).json("Not authorized to edit blog");
        }
    } catch (error) {
        console.error({ msg: "Error in updating blog", error });
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteBlog = async (req,res) => {
    try {
        const blogId = req.params.blogid;
        const userIdInParam = req.params.userid;

        const blog = await Blog.findById(blogId).populate('createdBy');

        if (!blog) {
            res.status(404).json("Blog not found");
            return;
        }

        const userIdInBlog = blog.createdBy._id;
        if (userIdInBlog.toString() === userIdInParam){
           await Blog.findByIdAndDelete({_id:blogId});
           res.status(200).json("Blog deleted successfully!!!");
        }else{
            res.status(403).json("Not authorized to delete blog");
        }
        
    } catch (error) {
        console.error({ msg: "Error in deleting blog", error });
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {
    getAll,
    createBlog,
    updateBlog,
    deleteBlog
}