const dotenv = require("dotenv");
dotenv.config();
console.log(process.env)

const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
 
  const sendWelcomeEmail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'sven.nijhuis@hva.nl', 
        subject: 'Welkom bij de Gamebuddy',
        text: 'and easy to do anywhere, even with Node.js',
        html: `hallo, ${name}`,
    })
  }

  module.exports = { sendWelcomeEmail }