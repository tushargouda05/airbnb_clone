require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Place = require("../models/Place");
const places = require("../../client/src/data/demoPlaces.json");

async function seed() {
  if (!process.env.MONGO_URI) throw new Error("Set MONGO_URI in server/.env before seeding.");
  await mongoose.connect(process.env.MONGO_URI);

  const email = "demo@staybnb.test";
  const password = "StaybnbDemo2026!";
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { name: "Staybnb Demo Host", email, password: await bcrypt.hash(password, 10) } },
    { upsert: true, returnDocument: "after", runValidators: true },
  );

  for (const place of places) {
    await Place.updateOne(
      { title: place.title, address: place.address },
      { $set: { ...place, owner: user._id } },
      { upsert: true, runValidators: true },
    );
  }

  console.log(`Seeded ${places.length} sample stays.`);
  console.log(`Demo login: ${email} / ${password}`);
}

seed()
  .catch((error) => {
    console.error("Demo data seeding failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
