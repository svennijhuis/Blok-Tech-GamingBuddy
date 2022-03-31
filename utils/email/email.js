const SENDGRID_API_KEY = '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'
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(SENDGRID_API_KEY)
 
  const sendWelcomeEmail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'sven.nijhuis@hva.nl', 
        subject: 'Welkom bij de Gmaebuddy',
        text: 'and easy to do anywhere, even with Node.js',
        html: `hallo, ${name}`,
    })
  }

  module.exports = { sendWelcomeEmail }