import { User } from "../model/User.js";
import { Event } from "../model/Event.js";

export const create = async (req, res) => {
  const user = await User.findById(req.userId);
  const { title, description, date, time, location } = req.body;
  try {
    const event = await Event.create({
      title,
      description,
      date,
      time,
      location,
      organizer: req.userId,
    });
    console.log(user);
    user.events.push(event);
    user.save();
    return res.send({ message: "Event created successfully", event: event });
  } catch (err) {
    return res.send({
      error: err.message,
    });
  }
};
