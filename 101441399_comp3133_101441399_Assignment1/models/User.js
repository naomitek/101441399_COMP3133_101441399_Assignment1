const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Expressions for Validation
const emailRegEx = /^\S+@\S+\.\S+$/;
const usernameRegEx = /^[a-zA-Z0-9_]{4,20}$/;

// Create Schema
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minLength: [4, "Username must be at least 4 characters"],
      maxLength: [20, "Username cannot be more than 20 characters"],
      match: [usernameRegEx, "Username can only contain letters, numbers, and underscores"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      maxLength: [100, "Email cannot be more than 100 characters"],
      match: [emailRegEx, "Email format is invalid. Must be XXX@XXX.XXX"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters"],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Pre-save hook to hash password and check for existing email
UserSchema.pre("save", async function (next) {
  console.log(`Attempting to save user with email: ${this.email}`);

  // Check if email already exists
  const existingUser = await mongoose.model("User").findOne({ email: this.email });
  if (existingUser) {
    console.log(`User with email ${this.email} already exists. Aborting save.`);
    return next(new Error(`User with email ${this.email} already exists. Cannot insert.`));
  }

  // Hash password before saving
  if (this.isModified("password")) {
    console.log("Hashing password...");
    this.password = await bcrypt.hash(this.password, 10);
  }

  console.log(`User with email ${this.email} does not exist. Proceeding with save.`);
  next();
});

// Create and export model
const User = mongoose.model("User", UserSchema);
module.exports = User;
