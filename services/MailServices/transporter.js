const nodemailer = require("nodemailer");

async function TransporterConfig() {
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: process.env.TRANSFER_HOST ,
        port: process.env.TRANSFER_PORT,
        secure: process.env.TRANSFER_SECURE, // true for 465, false for other ports
        auth: {
          user: process.env.USER, // generated ethereal user
          pass:process.env.USER_PWD, // generated ethereal password
        },
      });

}  

export default TransporterConfig;