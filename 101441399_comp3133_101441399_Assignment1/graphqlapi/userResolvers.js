const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userResolvers = {
  Query: {
    login: async (_, { email, password }) => {
      console.log("Attempting to log in with email:", email);
      
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) throw new Error("User not found");

      console.log("User password (hashed):", user.password); // Debugging the stored hashed password

      // Check if the provided password matches the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password match status:", isMatch); // Check if the comparison returns true or false

      if (!isMatch) throw new Error("Incorrect credentials");

      console.log("Password match successful!");

      return jwt.sign({ id: user.id }, "supersecretkey", { expiresIn: "1h" });
    },
  },

  Mutation: {
    signup: async (_, { username, email, password }) => {
      console.log("Attempting to sign up with email:", email);
      
      // Check if user already exists (redundant because of schema, but adding for clarity)
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new Error("User already exists");

      const user = new User({ username, email, password }); // No need to hash the password again

      try {
        console.log("Attempting to save user...");
        const savedUser = await user.save();
        console.log("User saved:", savedUser);  // Logs the result after saving

        return {
          id: savedUser.id,
          username: savedUser.username,
          email: savedUser.email,
        };
      } catch (error) {
        console.error("Error saving user:", error);  // Logs any errors during the save
        throw new Error("Error saving user: " + error.message);
      }
    },
  },
};

module.exports = userResolvers;
