import { User } from "../model/User.js";
import { Ticket } from "../model/Ticket.js";

export const purchaseTicket = async (req, res) => {
  const { ticketType, price, quantity } = req.body;
  const { event } = req.params;
  const user = await User.findById(req.userId);
  try {
    const ticket = await Ticket.create({
      user: req.userId,
      event,
      ticketType,
      price,
      quantity,
    });

    user.tickets.push(ticket);
    user.save();
    return res.send({
      message: "Ticket Buy successfully",
      ticket: ticket,
    });
  } catch (err) {
    return res.send({
      error: err.message,
    });
  }
};

export const getTickets = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("tickets");
    const tickets = user.tickets;
    res.send({
      message: "get all purchased Tickets",
      tickets,
    });
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};
