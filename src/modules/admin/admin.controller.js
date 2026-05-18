const Ticket =
require("../tickets/ticket.model");

const Reply =
require("../tickets/reply.model");



const replyToTicket =
async(req,res)=>{

   try{

      const { id } =
      req.params;





      const {
         message,
         status
      } = req.body;






      const ticket =
      await Ticket.findById(id);





      if(!ticket){

         return res.status(404).render(
            "error",
            {
               message:"Ticket not found"
            }
         );
      }







      // CREATE REPLY

      await Reply.create({

         message,

         sender:req.user.id,

         ticket:id

      });








      // UPDATE STATUS

      if(status){

         ticket.status = status;

         await ticket.save();
      }








      // REDIRECT

      res.redirect(
         "/admin/tickets"
      );




   }catch(error){

      res.status(500).json({

         message:error.message

      });
   }
};




module.exports =
replyToTicket;