const validator = require("fastest-validator");
const v = new validator();

const registerSchema = {
  email: {
    type: "email",
    required: true,
    messages: {
      required: "Email is required",
      email: "Email is not valid",
      empty: "Email is required",
    },
  },
  password: {
    type: "string",
    required: true,
    messages: {
      required: "Password is required",
      empty: "Password is required",
    },
  },
  role: {
    type: "string",
    enum: ["user", "admin"],
    default: "user",
    messages: {
      required: "Role is required",
      empty: "Role is required",
    },
  },
};
const registerValidator = v.compile(registerSchema);
module.exports = { registerValidator };
