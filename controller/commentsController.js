import { Event } from "../model/Event.js";
import { Comment } from "../model/Comment.js";
import { User } from "../model/User.js";

export const create = async (req, res) => {
  const { text } = req.body;
  const { event } = req.params;
  try {
    const user = await User.findById(req.userId);
    const eventObj = await Event.findById(event);
    if (!eventObj) {
      return res.send({
        message: "Event not found, enter valid event Id",
      });
    }
    const comment = await Comment.create({
      user: req.userId,
      event: event,
      text,
    });

    eventObj.comments.push(comment);
    eventObj.save();
    user.comments.push(comment);
    user.save();

    return res.send({
      message: "comment created successfully",
      comment: comment,
    });
  } catch (err) {
    return res.send({
      error: err.message,
    });
  }
};
