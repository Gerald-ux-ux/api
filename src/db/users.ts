import mongoose from "mongoose";

/** user */
const userSchema = new mongoose.Schema({
  username: { type: "string", required: true },
  email: { type: "string", required: true },

  authentication: {
    password: { type: "string", required: true, select: false },
    salt: { type: "string", select: false },
    sessionToken: { type: "string", select: false },
  },
});


