const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/send', (req,res,next)=>{
  /**
   * Set up to prepare the application to
   * send in emails
   */
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure:false,
    tls: {
      ciphers:'SSLv3'
   },
    auth: {
      user: 'letswatchdevteam@outlook.com',
      pass: 'KvhvUh34'
    }
  });

  /**
   * Send the user message to our own company
   * email
   */
  const userMessage = {
    from: "letswatchdevteam@outlook.com",
    to: "letswatchdevteam@outlook.com",
    subject: "Website Question/Concern Report",
    text: req.body.message,
  };

  /**
   * no-reply emal set up
   */
  const noReply = {
    from: "letswatchdevteam@outlook.com",
    to: req.body.email+"",
    subject: "Thank you for reaching out to us",
    text: req.body.name+
    ",\nThank you for reaching out to us. We will "+
    "deal with your question/concern as soon as possible."+
    "We hope that our response will make your website experience better.\n\n"+
    "Regards,\nletswatch.io"
  };

  // Sends both emails
  transporter.sendMail(noReply, (ressults,error)=>{
    transporter.sendMail(userMessage, (ressults,error)=>{
      if(error){
        console.log(error);
        res.status(400).json({
          emailSent:false
        });
      }
    });
    if(error){
      console.log(error);
      res.status(400).json({
        emailSent:false
      });
    }
  });

    res.status(200).json({
      emailSent:true
    })

});

module.exports = router;
