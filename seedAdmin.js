const mongoose = require("mongoose");
const User = require("./User");
const bcrypt = require("bcryptjs");

async function seed() {
  try {
    await mongoose.connect("mongodb://localhost:27017/nexuscoin");
    console.log("MongoDB connected");

    const email = "admin@example.com";
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("Admin account already exists! Email:", email);
    } else {
      const admin = new User({
        name: "Admin",
        email: email,
        password: "password123"
      });
      await admin.save();
      console.log("Admin account created! Email:", email, "Password: password123");
    }
  } catch (err) {
    console.error("Error creating admin account:", err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

seed();
