const nodemailer = require("nodemailer");

const sendMail = async (id, email, fName, lName) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: process.env.MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Tiisetso Ntsoane 👻" <hlabirwa.me@gmail.com>', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta http-equiv="Content-Type" content="text/html" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
        <title>Document</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: #f6f9fc;
            font-family: "Cormorant Garamond";
          }
    
          table {
            padding: 0;
          }
    
          h5:first-child {
            margin: 1rem auto;
            padding: 0.5rem 0rem;
            width: 10rem;
            border: 1px #ffffff solid;
            border-radius: 5px;
          }
    
          a {
            text-decoration: none;
          }
    
          p {
            font-family: "Cormorant Garamond";
            font-weight: 400;
            font-size: 1.1rem;
          }
    
          p:first-child {
            font-size: 1.5rem;
            font-weight: 500;
          }
    
          .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f6f9fc;
            padding-bottom: 40px;
          }
    
          .webkit {
            max-width: 600px;
            background-color: #ffffff;
          }
    
          .outer {
            margin: 0 auto;
            width: 100%;
            max-width: 600px;
            border-spacing: 0;
          }
    
          @media screen and (max-width: 768px) {
          }
          @media screen and (max-width: 500px) {
            .button {
              width: 50% !important;
            }
          }
        </style>
      </head>
      <body>
        <center class="wrapper">
          <div class="webkit">
            <table class="outer" align="center">
              <tr>
                <td>
                  <table width="100%" style="border-spacing: 0">
                    <tr>
                      <td style="background-color: rgb(65, 65, 65)">
                        <a href="#" alt="logo" title="logo">
                          <h5 style="text-align: center; color: #ffffff">
                            ELCASSICA
                          </h5>
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="padding: 2rem">
                  <p>Hi ${fName} ${lName}</p>
                  <p>
                    Thank you for signing up for Elcassica! Please verify your email
                    address by clicking the button below.
                  </p>
                  <a href="http://localhost:3000/signUp/mailVerification/${id}">
                    <div
                    class="button"
                        style="
                            background-color: rgb(65, 65, 65);
                            color: #ffffff;
                            padding: 0.8rem;
                            margin: 2.5rem 0rem;
                            width: 30%;
                            text-align: center;
                        "
                    >
                    Confirm my account
                </div>
                  </a>
                  <p>
                    Please note that unverified accounts are automatically deleted
                    in 30 days after sign up.
                  </p>
                  <p>If you didn't request this, please ignore this email</p>
                  <div
                    style="
                      height: 1px;
                      background-color: #e6e6e6;
                      margin: 2rem 0rem;
                    "
                  ></div>
                  <h5 style="text-align: left; font-size: 1.1rem">
                    Yours, Elcassica Team
                  </h5>
                  <p>support@t-tech.co.za</p>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>
    </html>
    `,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = sendMail;
