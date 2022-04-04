const dotenv = require("dotenv");
dotenv.config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "sven.nijhuis@hva.nl",
    subject: "Welcome to Gamebuddy",
    text: "heya",
    html: `Hello, ${name}, Thank you for using our service. If there are any questions in the coming days, you can contact us to answer this email.`
  });
};

module.exports = { sendWelcomeEmail };
