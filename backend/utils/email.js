const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { email,
    clientId,
    clientSecret,
    refreshToken,
    redirectUri } = require('../credentials');

const CLIENT_ID = clientId;
const CLIENT_SECRET = clientSecret;
const REDIRECT_URI = redirectUri;
const REFRESH_TOKEN = refreshToken;
const SENDER_EMAIL = email;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const sendEmail = async ({ to, subject, text }) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: SENDER_EMAIL,
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: `Legacy Link <${SENDER_EMAIL}>`,
      to,
      subject,
      text,
    };

    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.error('Ошибка при отправке email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
