
const transporter = require("./transporter");
const options = require("./Options")

const Mailer = async (options) =>{
let info = await transporter.sendMail({
    from: options.from,
    to: options.to,
    subject: options.subject,
    text: options.text,
  });
}
  export default Mailer;