const sgMail = require('@sendgrid/mail');
require("dotenv/config");
sgMail.setApiKey(process.env.SANDGRID);

exports.emailRender = (req, res) => {
    res.render('../views/email.pug');
};

exports.postEmail = (req, res) => {

    const {email, name, message, phone} = req.body;
    const msg = {
        to: 'damianfurmanczykgm@gmail.com',
        from: email,
        subject: 'Sending with SendGrid is Fun',
        html: `Imię: ${name}, nr. telefonu: ${phone || 'nie podano'} wiadomość: \n\r \v<strong>${message}</strong>`
    };
    sgMail.send(msg);
    res
        .status(204)
        .send(true);
};
