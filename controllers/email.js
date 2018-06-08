const sgMail = require('@sendgrid/mail');
require("dotenv/config");
sgMail.setApiKey(process.env.SANDGRID);

exports.emailRender = (req, res) => {
    res.render('../views/email.pug');
};

exports.postEmail = (req, res) => {

    const {email, name, message} = req.body;
    const msg = {
        to: 'damianfurmanczykgm@gmail.com',
        from: email,
        subject: 'Sending with SendGrid is Fun',
        html: `Hello its ${name} and here is a message: \n\r \v<strong>${message}</strong>`
    };
    sgMail.send(msg);
    res
        .status(204)
        .send(true);
};