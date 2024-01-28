import { User } from "../model/User.js";
import { Ticket } from "../model/Ticket.js";

export const create = async (req, res) => {
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
