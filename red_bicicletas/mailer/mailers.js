const nodemailer = require ('nodemailer');



   const mailConfig = {
      host: 'smtp.ethereal.email',
      port: 587 ,
      auth: {
        user: 'eli.goodwin77@ethereal.email',
        pass: 'wbAXfNtd7Yx2YQqqWT'
      }
    };
   

module.exports = nodemailer.createTransport(mailConfig);