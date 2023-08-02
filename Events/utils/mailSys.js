const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "thisistestmail1997@gmail.com",
    pass: "legktybqibgqezra",
  },
});

const mailSysForBirthday = async(clientMail,clientName) => {
  const mailOptions = {
    from: "mail",
    to: await clientMail,
    subject: `Hey ${clientName} Happy birthday!!!`,
    text: `Happy birthday ${clientName} we hope you have a blast today!!! `,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

const mailSysForWorkAnniversary = async(clientMail,clientName) => {
  const mailOptions = {
    from: "thisistestmail1997@gmail.com",
    to: await clientMail,
    subject: `Hey ${clientName} Happy work anniversary!!!`,
    text: `We are glad to have you on our side ${clientName} looking forward for more enjoyable years together`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = { mailSysForBirthday,mailSysForWorkAnniversary };
