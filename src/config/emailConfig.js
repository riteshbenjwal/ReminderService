const nodemailer = require("nodemailer");

const { SMPTUSER, SMPTPASS } = require("./serverConfig");

const sender = nodemailer.createTransport({
  service: "SendinBlue",
  auth: {
    user: SMPTUSER,
    pass: SMPTPASS,
  },
});

module.exports = sender;
