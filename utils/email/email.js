const dotenv = require("dotenv");
dotenv.config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (name, email) => {
  sgMail.send({
    to: email,
    from: "sven.nijhuis@hva.nl",
    subject: "Welcome to GameBuddies",
    text: "GameBuddies",
    html: `

    <html>
    <head><meta name="viewport" content="width=device-width"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <title>Welcome by GameBuddies</title>
      <style media="all" type="text/css">@media only screen and (max-width: 480px) {
      table[class=body] h1 {
        font-size: 24px !important;
      }
      table[class=body] h2 {
        font-size: 20px !important;
      }
      table[class=body] h3 {
        font-size: 14px !important;
      }
      table[class=body] .content,
      table[class=body] .wrapper {
        padding: 15px !important;
      }
      table[class=body] .container {
        width: 100% !important;
        padding: 0 !important;
      }
      table[class=body] .column {
        width: 100% !important;
      }
      table[class=body] .stats .column {
        width: 50% !important;
      }
      table[class=body] .hero-image,
      table[class=body] .thumb {
        width: 100% !important;
        height: auto !important;
      }
      table[class=body] .btn table,
      table[class=body] .btn a {
        width: 100% !important;
      }
      table[class=body] .stats-table {
        display: none !important;
      }
      table[class=body] .stats-labels .label,
      table[class=body] .category-labels .label {
        font-size: 10px !important;
      }
      table[class=body] .credits table {
        table-layout: auto !important;
      }
      table[class=body] .credits .label {
        font-size: 11px !important;
      }
    }
      </style>
    </head>
    <body style="font-size: 16px; background-color: #fdfdfd; margin: 0; padding: 0; -webkit-text-size-adjust: 100%; line-height: 1.5; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased; height: 100% !important; width: 100% !important;">
    <table bgcolor="#fdfdfd" class="body" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: 100%; background-color: #fdfdfd; border-collapse: separate !important;" width="100%">
      <tbody>
        <tr>
          <td style="box-sizing: border-box; padding: 0; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
          <td class="container" style="box-sizing: border-box; padding: 0; font-size: 16px; vertical-align: top; display: block; width: 600px; max-width: 600px; margin: 0 auto !important;" valign="top" width="600">
          <div class="content" style="box-sizing: border-box; display: block; max-width: 600px; margin: 0 auto; padding: 10px;"><span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Welkom bij GameBuddies</span>
          <div class="header" style="box-sizing: border-box; width: 100%; margin-bottom: 30px; margin-top: 15px;">
          <table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important;" width="100%">
          </table>
          </div>
    
          <div class="block" style="box-sizing: border-box; width: 100%; margin-bottom: 30px; background: #ffffff; border: 1px solid #f0f0f0;">
          <table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important;" width="100%">
            <tbody>
              <tr>
                <td class="wrapper" style="box-sizing: border-box; font-size: 16px; vertical-align: top; padding: 30px;" valign="top">
                <table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; border-collapse: separate !important;" width="100%">
                  <tbody>
                    <tr>
                      <td style="box-sizing: border-box; padding: 0;  font-size: 16px; vertical-align: top;" valign="top">
                      <h2 style="margin: 0; margin-bottom: 30px; font-weight: 300; line-height: 1.5; font-size: 24px; color: #294661 !important;">Are you ready to meet new people!</h2>
    
                      <p style="margin: 0; margin-bottom: 30px; color: #294661;  font-size: 16px; font-weight: 300;"> Hello ${name}, Thank you for using our service. If there are any questions in the coming days, you can contact us to answer this email</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="box-sizing: border-box; padding: 0; font-size: 16px; vertical-align: top;" valign="top">
                      <table cellpadding="0" cellspacing="0" class="btn btn-primary" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: 100%; border-collapse: separate !important;" width="100%">
                        <tbody>
                          <tr>
                            <td align="center" style="box-sizing: border-box; padding: 0; font-size: 16px; vertical-align: top; padding-bottom: 15px;" valign="top">
                            <table cellpadding="0" cellspacing="0" style="box-sizing: border-box; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; width: auto; border-collapse: separate !important;">
                              <tbody>
                                <tr>
                                  <td align="center" bgcolor="#348eda" style="box-sizing: border-box; padding: 0; font-size: 16px; vertical-align: top; background-color: #348eda; border-radius: 2px; text-align: center;" valign="top"><a href="https://gamebuddy-tech.herokuapp.com/login" style="box-sizing: border-box; border-color: #348eda; font-weight: 400; text-decoration: none; display: inline-block; margin: 0; color: #ffffff; background-color: #000; border: solid 1px #348eda; border-radius: 2px; cursor: pointer; font-size: 14px; padding: 12px 45px;" target="_blank">Come to game buddies now</a></td>
                                </tr>
                              </tbody>
                            </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
    
          <div class="footer" style="box-sizing: border-box; clear: both; width: 100%;">
          <table style="box-sizing: border-box; width: 100%; border-spacing: 0; mso-table-rspace: 0pt; mso-table-lspace: 0pt; font-size: 12px; border-collapse: separate !important;" width="100%">
            <tbody>
              <tr style="font-size: 12px;">
                <td align="center" class="align-center" style="box-sizing: border-box; vertical-align: top; font-size: 12px; text-align: center; padding: 20px 0;" valign="top">
    
                <p class="tagline" style="color: #294661; font-size: 12px; font-weight: 400; margin-bottom: 5px; margin: 10px 0 20px;">We look forward to your visit!</p>
    
                <p style="margin: 0; color: #294661; font-weight: 300; font-size: 12px; margin-bottom: 5px;">© GameBuddies</p>
    
                <p style="margin: 0; color: #294661; font-weight: 300; font-size: 12px; margin-bottom: 5px;"><a href="#" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Blog</a> <a href="#" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">GitHub</a> <a href="#" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Twitter</a> <a href="#" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">Facebook</a> <a href="#" style="box-sizing: border-box; color: #348eda; font-weight: 400; text-decoration: none; font-size: 12px; padding: 0 5px;" target="_blank">LinkedIn</a></p>
                </td>
              </tr>
            </tbody>
          </table>
          </div>
          </div>
          </td>
          <td style="box-sizing: border-box; padding: 0; font-size: 16px; vertical-align: top;" valign="top">&nbsp;</td>
        </tr>
      </tbody>
    </table>
    </body>
  </html>`
  });
};


module.exports = { sendWelcomeEmail  };
