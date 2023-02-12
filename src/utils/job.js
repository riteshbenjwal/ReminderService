const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/emailConfig");

/**
 * 10:00 AM every day
 * Every 5 minutes
 * We will check are their any pending emails which was expected to be sent by now and is pending
 */

const setupJobs = () => {
  console.log("Setting up jobs");
  cron.schedule("*/2 * * * *", async () => {
    console.log("Running job");
    const response = await emailService.fetchPendingEmails();
    response.forEach((email) => {
      sender.sendMail(
        {
          to: email.recipientEmail,
          from: "reminderService@gmail.com",
          subject: email.subject,
          text: email.content,
        },
        async (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log(data);
            await emailService.updateTicket(email.id, { status: "SUCCESS" });
          }
        }
      );
    });
    console.log(response);
  });
};

module.exports = setupJobs;
