const mongoose = require("mongoose");
const User  = require("./user");
const { Event } = require("./events");
const eventAttendeeSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,

    ref: Event,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
});
const Attendees = mongoose.model("Attendees", eventAttendeeSchema);
module.exports = Attendees;
