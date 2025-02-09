const express = require("express");
const connectDB = require("./src/config/config");
const authRouter = require("./src/routes/auth");
const eventRouter = require("./src/routes/event");
const cookieParser = require("cookie-parser");
const attendeesRouter = require("./src/routes/attendees");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", eventRouter);
app.use("/", attendeesRouter);

connectDB()
  .then(() => {
    console.log("Database connected");
    app.listen(3000, () => {
      console.log("Server is started at 3000");
    });
  })
  .catch((error) => {
    console.error("Database is failed");
  });
