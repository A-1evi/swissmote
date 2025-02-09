const express = require("express");
const attendeesRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEventId } = require("../utils/validate");
const { Event } = require("../models/events");
const User = require("../models/user");
const Attendees = require("../models/attendees");

attendeesRouter.post(
  "/event/attendees/:eventId",
  userAuth,
  async (req, res) => {
    try {
      const { eventId } = req.params;

      // Validate the event ID
      validateEventId(eventId);

      // Find the event by ID
      const event = await Event.findById({ id: eventId });
      if (!event) {
        return res.status(404).json({ error: "Event not found" });
      }
      const userId = req.user._id;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      if (event.createdBy.toString() === userId.toString()) {
        return res
          .status(400)
          .json({ error: "You cannot attend your own event" });
      }

      const existingAttendee = await Attendees.findOne({
        event: eventId,
        user: userId,
      });
      if (existingAttendee) {
        return res
          .status(400)
          .json({ error: "You are already an attendee of this event" });
      }

      // Add the user as a new attendee
      const newAttendee = new Attendees({
        event: eventId,
        user: userId,
      });
      await newAttendee.save();

      res.status(201).json({ message: "Attendee added successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error: " + error.message });
    }
  }
);

module.exports = attendeesRouter;
