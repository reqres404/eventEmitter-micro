const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "thisistestmail1997@gmail.com",
    pass: "lawweqgrzfexwgez",
  },
});

const mailSysForBirthday = async(clientMail,clientName) => {
  const mailOptions = {
    from: "mail",
    to: await clientMail,
    subject: `Hey ${clientName} Happy birthday!!!`,
    text: `"🎉🎂 Happy Birthday ${clientName}! 🎂🎉

    On this special day, may your heart be filled with joy, your path be surrounded by love, and your journey ahead be full of exciting adventures. Another year older, wiser, and more amazing than ever! May your dreams continue to flourish and your smile light up the world. Here's to a day as wonderful as you are. Have a fantastic birthday celebration!" 🥳🎈`,
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
    text: `🎉🎊 Congratulations ${clientName} on reaching another milestone in your journey with XYZ! 🎊🎉

    Your dedication, hard work, and commitment to excellence have been truly inspiring. Over the years, you have consistently contributed your best to our team and helped us achieve new heights. Your passion and enthusiasm are a driving force for all of us.
    
    As you celebrate this work anniversary, know that your efforts are deeply valued and appreciated. Here's to many more years of success, growth, and shared accomplishments. Thank you for being an integral part of our XYZ family. Wishing you continued success and fulfillment in the years ahead! 🥂🎈`,
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
