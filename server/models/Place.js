const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    photos: [{ type: String }],
    description: { type: String, default: "" },
    perks: [{ type: String }],
    extraInfo: { type: String, default: "" },
    checkIn: { type: String, default: "" },
    checkOut: { type: String, default: "" },
    maxGuests: { type: Number, default: 1, min: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Place", placeSchema);