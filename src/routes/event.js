//create event
//get all events
//get event by id
//update event by id
//delete event by id
const Event = require("../models/events");
const { userAuth } = require("../middlewares/auth");
const { validateEventData, validateEventId } = require("../utils/validate");
const express = require("express");
const eventRouter = express.Router();

eventRouter.post("/event/create", userAuth, async (req, res) => {
  try {
    validateEventData(req);
    const { title, description, date, location, image } = req.body;
    const event = await Event.create({
      title,
      description,
      date,
      location,
      image,
      createdBy: req.user._id,
    });
    res.json({ message: "Event created successfully!", data: event });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});
eventRouter.get("/event/all", async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ message: "Events fetched successfully!", data: events });
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

eventRouter.get("/event/:id", async (req, res) => {
  try {
    validateEventId(req);
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }
    res.json({ message: "Event fetched successfully!", data: event });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});
eventRouter.put("/event/:id", userAuth, async (req, res) => {
  try {
    validateEventId(req.params);
    validateEventData(req);
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event not found");
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      throw new Error("You are not authorized to update this event");
    }
    Object.keys(req.body).forEach((key) => {
      if (req.body[key]) {
        event[key] = req.body[key];
      }
    });
    await event.save();
    res.json({ message: "Event updated successfully!", data: event });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});
eventRouter.delete("/event/:id", userAuth, async (req, res) => {
  try {
    validateEventId(req.params);
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      throw new Error("Event is not found");
    }
    if (event.createdBy.toString() !== req.user._id.toString()) {
      throw new Error("You are not authorized to delete this event");
    }
    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully!" });
  } catch (error) {
    res.status(400).send("ERROR:" + error.message);
  }
});

module.exports = eventRouter;
