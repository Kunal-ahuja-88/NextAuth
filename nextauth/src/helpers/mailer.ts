import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from "bcryptjs"
export const sendEmail = async({email,emailType,userId} : any)=>{
    try {
     
      const hashedToken = await bcryptjs.hash(userId.toString(),10)
    
     if(emailType==="VERIFY") {
       await User.findByIdAndUpdate(userId,
        {verifyToken:hashedToken}
       )
     }

        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false,
            auth: {
              user: "maddison53@ethereal.email",
              pass: "jn7jnAPss4f63QBp6D",
            },
          });

        const mailOptions =  {
            from: 'kunal@kunal.com',
            to: email,
            subject: emailType==='VERIFY'?"Verify your email":"Reset your password", 
            html: "<b>Hello world?</b>",
          };
          
          const mailResponse = await transporter.sendMail
          (mailOptions)
          return mailResponse
    } catch (error:any) {
        throw new Error(error.message)
    }
}