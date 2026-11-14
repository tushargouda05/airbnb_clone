
const mongoose = require("mongoose");

const connectwithDB = () => {
  mongoose.set("strictQuery", true);
  mongoose
    .connect(process.env.MONGO_URI)
    .then((conn) => console.log(`MongoDB connected: ${conn.connection.host}`))
    .catch((err) => {
      console.error("Error connecting to MongoDB:", err);
      process.exit(1);
    });
};

module.exports = connectwithDB;