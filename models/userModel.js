import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      index: true,
    },
    role: {
      type: String,
      enum: ["admin", "student"],
      default: "student",
    },
    refreshTokens: {
      type: [String],
      default: [],
    },
    passwordHash: {
      type: String,
      required: [true, "password is required"],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;