import { User } from "../model/User.js";
import { Event } from "../model/Event.js";

export const create = async (req, res) => {
  const { title, description, date, time, location } = req.body;
  try {
    const user = await User.findById(req.userId);
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

export const allEvents = async (req, res) => {
  try {
    const events = await Event.find();
    return res.send({
      message: "All Events",
      events: events,
    });
  } catch (err) {
    return res.send({
      error: err.message,
    });
  }
};

export const eventById = async (req, res) => {
  const { eventid } = req.params;
  try {
    const event = await Event.findById(eventid);
    return res.send({
      message: "get event details",
      event: event,
    });
  } catch (err) {
    return res.send({
      error: err.message,
    });
  }
};
