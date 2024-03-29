import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  organizer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  average_rating: {
    type: Number,
    default: 0,
  },
  ratings: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      rate: Number,
    },
  ],
  // isDelete is used for soft delete
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre is used for soft delete
eventSchema.pre("find", function () {
  this.where({ isDeleted: false });
});

eventSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

eventSchema.pre("findById", function () {
  this.where({ isDeleted: false });
});

export const Event = mongoose.model("Event", eventSchema);
