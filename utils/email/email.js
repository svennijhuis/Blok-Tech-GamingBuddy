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
    html: `Hello, ${name}, thank you for chosing GameBuddies!! If you have any questions, don't hesistate to ask them via replying to this mail :)`
  });
};

module.exports = { sendWelcomeEmail };
