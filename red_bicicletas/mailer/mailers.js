const nodemailer = require ('nodemailer');
const sgTransport= require ('nodemailer-sendgrid-transport');

let mailConfig;

if (process.env.NODE_ENV==='production'){
	const options= {
		auth: {
			api_key: process.env.SENDGRID_API_SECRET
		}
	};
	mailConfig= sgTransport(options);
}else {
if (process.env.NODE_ENV==='staging') {
	console.log ('xxxxxxxxxxxxx');
	const options={
		auth: {
			api_key: process.env.SENDGRID_API_SECRET
		}
	}
	mailConfig=sgTransport(options);
  } else {

  // email are catches by etherreal . email

   mailConfig = {
      host: 'smtp.ethereal.email',
      port: 587 ,
      auth: {
        user: 'eli.goodwin77@ethereal.email',
        pass: 'wbAXfNtd7Yx2YQqqWT'
      }
    };
   }
}   

module.exports = nodemailer.createTransport(mailConfig);