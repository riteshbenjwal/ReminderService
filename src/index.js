const express = require("express");
const bodyParser = require("body-parser");

const { PORT, REMINDER_BINDING_KEY } = require("./config/serverConfig");
const TicketController = require("./controllers/ticket-controller");
const EmailService = require("./services/email-service");

const jobs = require("./utils/job");
const { subscribeMessage, createChannel } = require("./utils/messageQueue");

const setupAndStartServer = async () => {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.post("/api/v1/tickets", TicketController.create);

  const channel = await createChannel();
  subscribeMessage(channel, EmailService.subscribeEvents, REMINDER_BINDING_KEY);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    jobs();
  });
};

setupAndStartServer();
