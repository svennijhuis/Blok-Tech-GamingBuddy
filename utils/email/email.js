const SENDGRID_API_KEY = ''
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)
 
  const sendWelcomeEmail = (name, email) => {
    sgMail.send({
        to: email, // Change to your recipient
        from: 'sven.nijhuis@hva.nl', // Change to your verified sender
        subject: 'Welkom bij de Gmaebuddy',
        text: 'and easy to do anywhere, even with Node.js',
        html: `hallo, ${name}`,
    })
  }

  module.exports = { sendWelcomeEmail }
