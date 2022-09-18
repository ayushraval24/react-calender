require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const EventModel = require("./models/eventModel");
const CaregoryModel = require("./models/categoryModel");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/category", async (req, res, next) => {
  try {
    const events = await CaregoryModel.find();

    if (!events) {
      return res.status(400).json({ message: "No events found" });
    }

    return res.status(200).json({ data: events });
  } catch (err) {
    console.log(err);
  }
});

app.post("/category", async (req, res, next) => {
  try {
    const { name } = req.body;

    const event = await CaregoryModel.create({
      name: name,
    });

    return res.status(201).json({ data: event });
  } catch (err) {
    console.log(err);
  }
});

app.get("/events", async (req, res, next) => {
  try {
    const events = await EventModel.find().populate("category");

    if (!events) {
      return res.status(400).json({ message: "No events found" });
    }

    return res.status(200).json({ data: events });
  } catch (err) {
    console.log(err);
  }
});

app.post("/events", async (req, res, next) => {
  try {
    const { title, description, start, end, category } = req.body;

    console.log("Body: ", req.body);

    const event = await EventModel.create({
      title: title,
      description: description,
      start: start,
      end: end,
      category: category,
    });

    return res.status(201).json({ data: event });
  } catch (err) {
    console.log(err);
  }
});

app.put("/events/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    console.log("This is id: ", id);
    console.log("This is data: ", data);
    const newEvent = await EventModel.findByIdAndUpdate(id, data);

    return res
      .status(200)
      .json({ data: newEvent, message: "Event updated successfully" });
  } catch (err) {
    res.status(500).json("Something went wrong");
  }
});

app.delete("/events/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    if (id) {
      const blog = await EventModel.findByIdAndRemove(id);
      return res.status(200).json({ message: "Event deleted successfully" });
    } else {
      return res.status(404).json({ error: "Id is required" });
    }
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(5000, () => {
      console.log("Server started on port 5000");
    });
  })
  .catch((err) => {
    console.log("Something went wrong");
  });
