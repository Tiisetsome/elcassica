const nodemailer = require("nodemailer");

const sendOrderConfirmation = async (user, orderId, address) => {
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.NODE_MAIL_HOST,
      port: process.env.NODE_MAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODE_MAIL_USERNAME, // generated ethereal user
        pass: process.env.NODE_MAIL_PASSWORD, // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Tiisetso Ntsoane 👻" <hlabirwa.me@gmail.com>', // sender address
      to: user.email, // list of receivers
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
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap"
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
      
            h5.logo {
              margin: 1rem 0rem;
              padding: 0.5rem 0rem;
              width: 10rem;
              border: 1px black solid;
              border-radius: 5px;
            }
      
            h5.column {
              padding-bottom: 1rem;
              margin-bottom: 1rem;
              text-align: left;
              font-size: 1.1rem;
              text-transform: uppercase;
              border-bottom: 1px rgb(221, 221, 221) solid;
            }
      
            a {
              text-decoration: none;
            }
      
            p {
              font-family: "Poppins";
              font-weight: 400;
              font-size: 0.8rem;
              color: rgb(107, 107, 107);
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
              padding: 2rem;
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
                        <td
                          style="
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                          "
                        >
                          <a href="http://localhost:3000" alt="logo" title="logo">
                            <h5 class="logo" style="text-align: center; color: black">
                              ELCASSICA
                            </h5>
                          </a>
                          <a href="http://localhost:3000/dashboard">
                            <h5 style="text-align: center; color: black">
                              My Account
                            </h5>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5
                      style="
                        text-align: center;
                        font-size: 1.4rem;
                        color: rgb(77, 77, 77);
                      "
                    >
                      Order confirmed
                    </h5>
                    <p>Dear ${user.name} ${user.lastName}</p>
                    <p>Congradulation on your successful purchase with ELCASSICA!</p>
                    <p style="margin-bottom: 3rem">
                      If you have not paid for this order,
                      <a href="http://localhost:3000/dashboard"></a
                      ><span style="color: rgb(172, 1, 1); text-decoration: underline"
                        >click here</span
                      >
                      to pay. If payment is not processed within 3 hour(s), the order
                      will be cancelled automatically.
                    </p>
                    <p>
                      Best regards, <br />
                      Elcassica Team
                    </p>
      
                    <div>
                      <h5 class="column">Order Number</h5>
                      <p style="padding: 0; margin: 0">${orderId}</p>
                    </div>
                    <div>
                      <h5 class="column">Shipping Address</h5>
                      <p style="padding: 0; margin: 0">
                        ${address.fname} ${address.lname}, <br />
                        ${address.province}, ${address.city}, <br />${address.surbub},
                        ${address.zipCode}, <br />
                        T: ${address.phoneNumber}
                      </p>
                    </div>
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

module.exports = sendOrderConfirmation;
