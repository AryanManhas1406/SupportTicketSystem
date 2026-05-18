const router =
require("express").Router();

const controller =
require("./blog.controller");


// your auth middleware

const authMiddleware =
require("../../middlewares/authMiddleware");

const adminMiddleware =
require("../../middlewares/adminMiddleware");





// PUBLIC ROUTES


// all approved blogs

router.get(
   "/",
   controller.approvedBlogs
);





// USER ROUTES


// logged in user blogs

router.get(
   "/my-blogs",
   authMiddleware,
   controller.myBlogs
);


// create blog
router.get(
   "/create",
   authMiddleware,
   (req,res)=>{

      res.render(
         "blogs/createBlog"
      );

   }
);
router.get(
   "/edit/:id",

   authMiddleware,

   controller.editPage
);

router.post(
   "/create",
   authMiddleware,
   controller.createBlog
);


router.post(
   "/edit/:id",
   authMiddleware,
   controller.editBlog
);

router.post(
   "/delete/:id",
   authMiddleware,
   controller.deleteBlog
);


router.get(
   "/admin/all",
   authMiddleware,
   adminMiddleware,
   controller.adminBlogs
);

router.post(
   "/approve/:id",
   authMiddleware,
   adminMiddleware,
   controller.approveBlog
);

router.post(
   "/reject/:id",
   authMiddleware,
   adminMiddleware,
   controller.rejectBlog
);




module.exports = router;