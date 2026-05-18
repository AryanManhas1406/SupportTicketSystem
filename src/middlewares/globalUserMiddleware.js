const jwt = require("jsonwebtoken");

const globalUserMiddleware =
(req,res,next)=>{

   try{

      const token =
      req.cookies.token;





      if(token){

         const decoded =
         jwt.verify(
            token,
            process.env.JWT_SECRET
         );



         req.user = decoded;

         res.locals.user =
         decoded;

      }else{

         res.locals.user = null;
      }

   }catch(error){

      res.locals.user = null;
   }

   next();
};

module.exports =
globalUserMiddleware;