const TicketService = require("../services/email-service");

const create = async (req, res) => {
  try {
    const response = await TicketService.createNotificationTicket(req.body);
    res.status(200).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully registered an email reminder",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Error while registering an email reminder",
    });
  }
};

module.exports = {
  create,
};
