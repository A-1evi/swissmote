const validator = require("validator");

const validateSignUpData = (req) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !firstName || !lastName) {
    throw new Error("Missing required fields");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateLoginData = (req) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Error("Missing required fields");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  }
};

const validateEventData = (req) => {
  const { title, description, date, location, image } = req.body;
  if (!title || !description || !date || !location || !image) {
    throw new Error("Missing required fields");
  } else if (!validator.isURL(image)) {
    throw new Error("Image URL is not valid");
  } else if (!validator.isDate(date)) {
    throw new Error("Date is not valid"); //yyyy-mm-dd
  } else if (!validator.isLength(title, { min: 3, max: 100 })) {
    throw new Error("Title must be between 3 and 100 characters");
  } else if (!validator.isLength(description, { min: 10, max: 500 })) {
    throw new Error("Description must be between 10 and 500 characters");
  } else if (!validator.isLength(location, { min: 3, max: 100 })) {
    throw new Error("Location must be between 3 and 100 characters");
  }
};
const validateEventId = (req) => {
  const { id } = req.params;
  if (!id) {
    throw new Error("Event id is requires");
  } else if (!validator.isMongoId(id)) {
    throw new Error("Invalid event id");
  }
};
module.exports = {
  validateSignUpData,
  validateLoginData,
  validateEventData,
  validateEventId,
};
