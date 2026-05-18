const Blog = require("./BlogModel");
const {
   BlogSchema
} = require("./blog.validation");



// CREATE BLOG

const createBlog = async(req,res)=>{

   try{


      const { error } =
      BlogSchema.validate(req.body);

      if(error){

         return res.status(400).json({

            message:
            error.details[0].message

         });
      }



      // req body

      const {
         title,
         description
      } = req.body;



      // create blog

      const blog =
      await Blog.create({

         title,
         description,

         // logged in user
         user:req.user.id

      });



      res.status(201).json({

         message:
         "Blog created successfully",

         blog

      });




   }catch(error){

      res.status(500).json({

         message:error.message

      });
   }
};

const myBlogs = async(req,res)=>{

   try{

      const blogs = await Blog.find({

         // current logged in user blogs
         user:req.user.id

      }).sort({

         createdAt:-1

      });

      res.render(
         "blogs/myBlogs",
         { blogs }
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};


const approvedBlogs = async(req,res)=>{

   try{

      const blogs = await Blog.find({

         status:"approved"

      })
      .populate("user","name")
      .sort({
         createdAt:-1
      });

      res.render(
         "blogs/allBlogs",
         { blogs }
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};


const editPage =
async(req,res)=>{

   try{

      const blog =
      await Blog.findById(
         req.params.id
      );





      if(!blog){

         return res.status(404).json({

            message:"Blog not found"

         });
      }








      if(
         blog.user.toString()
         !==
         req.user.id
      ){

         return res.status(401).json({

            message:"Unauthorized"

         });
      }








      res.render(
         "blogs/editBlog",
         { blog }
      );




   }catch(error){

      res.status(500).json({

         message:error.message

      });
   }
};

const editBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({
            message:"Blog not found"
         });
      }

      if(
         blog.user.toString()
         !==
         req.user.id
      ){

         return res.status(401).json({
            message:"Unauthorized"
         });
      }

      blog.title =
      req.body.title;

      blog.description =
      req.body.description;

      blog.status = "pending";

      await blog.save();

      res.redirect(
         "/blogs/my-blogs"
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};




// DELETE BLOG

const deleteBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({
            message:"Blog not found"
         });
      }

      // only owner can delete

      if(
         blog.user.toString()
         !==
         req.user.id
      ){

         return res.status(401).json({
            message:"Unauthorized"
         });
      }

      await blog.deleteOne();

      res.redirect(
         "/blogs/my-blogs"
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};




// ADMIN VIEW ALL BLOGS

const adminBlogs = async(req,res)=>{

   try{

      const blogs = await Blog.find()
      .populate("user","name")
      .sort({
         createdAt:-1
      });

      res.render(
         "blogs/adminBlogs",
         { blogs }
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};




// APPROVE BLOG

const approveBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({
            message:"Blog not found"
         });
      }

      blog.status =
      "approved";

      await blog.save();

      res.redirect(
         "/blogs/admin/all"
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};




// REJECT BLOG

const rejectBlog = async(req,res)=>{

   try{

      const blog = await Blog.findById(
         req.params.id
      );

      if(!blog){

         return res.status(404).json({
            message:"Blog not found"
         });
      }

      blog.status =
      "rejected";

      await blog.save();

      res.redirect(
         "/blogs/admin/all"
      );

   }catch(error){

      res.status(500).json({
         message:error.message
      });
   }
};




module.exports = {

   createBlog,
   myBlogs,
   approvedBlogs,
   editPage,
   editBlog,
   deleteBlog,
   adminBlogs,
   approveBlog,
   rejectBlog

};