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
    if (events.length <= 0) {
      return res.send({
        message: "No events found",
      });
    }
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
    if (!event) {
      return res.send({
        message: "Event not found",
      });
    }
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

export const filterEvent = async (req, res) => {
  const { title, date, location } = req.query;
  let filterExpression = {};
  try {
    if (title) {
      filterExpression = { title: title };
    }
    if (date) {
      filterExpression = { ...filterExpression, date: date };
    }
    if (location) {
      filterExpression = { ...filterExpression, location: location };
    }
    const events = await Event.find(filterExpression);
    if (events.length <= 0) {
      return res.send({
        message: "No Events are available",
      });
    }
    return res.send({
      message: "all the searched events",
      events: events,
    });
  } catch (err) {
    return res.send({ error: err.message });
  }
};

export const searchEventByTitle = async (req, res) => {
  const { title } = req.body;
  try {
    const result = await Event.find({ title });
    if (result.length <= 0) {
      return res.send({
        message: "Event not found",
      });
    }
    return res.send({
      message: "Search by title",
      events: result,
    });
  } catch (err) {
    return res.send({ error: err.message });
  }
};
export const searchEventByDate = async (req, res) => {
  const { date } = req.body;
  try {
    const result = await Event.find({ date });
    if (result.length <= 0) {
      return res.send({
        message: "Event not found",
      });
    }
    return res.send({
      message: "Search by date",
      events: result,
    });
  } catch (err) {
    return res.send({ error: err.message });
  }
};

export const searchEventByLocation = async (req, res) => {
  const { location } = req.body;
  try {
    const result = await Event.find({ location });
    if (result.length <= 0) {
      return res.send({
        message: "Event not found",
      });
    }
    return res.send({
      message: "Search by location",
      events: result,
    });
  } catch (err) {
    return res.send({ error: err.message });
  }
};

export const addRating = async (req, res) => {
  const { eventId, rating } = req.body;
  try {
    const event = await Event.findById(eventId).populate("ratings").exec();
    const rated = await event.ratings.find((r) => r.user == req.userId);
    if (!event) {
      return res.send({
        message: "Event not found",
      });
    }
    if (rated) {
      return res.send({
        message: "already rated for this event",
        average_rating: event.average_rating,
      });
    }
    event.ratings.push({
      user: req.userId,
      rate: rating,
    });
    const ratings = event.ratings;
    const avg = ratings.reduce((acc, e) => acc + e.rate, 0) / ratings.length;
    event.average_rating = avg.toFixed(2);
    event.save();
    res.send({
      message: "Rating is added successfully",
      average_rating: event.average_rating,
    });
  } catch (err) {
    return res.send({ error: err.message });
  }
};

// only valid user can delete event
export const deleteEvent = async (req, res) => {
  const { eventid } = req.params;
  try {
    const event = await Event.findById(eventid);
    if (!event) {
      return res.send({
        message: "Event not exist/Event not found",
      });
    } else if (event.organizer != req.userId) {
      return res.send({
        message: "User is not Authorized to delete event",
      });
    } else {
      event.isDeleted = true;
      event.save();

      return res.send({
        message: "Event deleted successfully",
        event: event,
      });
    }
  } catch (err) {
    res.send({ error: err.message });
  }
};
