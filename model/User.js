import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  // isDelete is used for soft delete
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// pre is used for soft delete
userSchema.pre("find", function () {
  this.where({ isDeleted: false });
});
userSchema.pre("findOne", function () {
  this.where({ isDeleted: false });
});

export const User = mongoose.model("User", userSchema);
