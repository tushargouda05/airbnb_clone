const Place = require("../models/Place");

const FIELDS = [
  "title", "address", "photos", "description", "perks",
  "extraInfo", "checkIn", "checkOut", "maxGuests", "price",
];

// Whitelist fields so clients can't set owner, _id, etc.
const pickFields = (body) =>
  FIELDS.reduce((acc, key) => {
    if (body[key] !== undefined) acc[key] = body[key];
    return acc;
  }, {});

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const handleError = (res, error) => {
  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }
  if (error.name === "CastError") {
    return res.status(404).json({ message: "Place not found" });
  }
  return res.status(500).json({ message: "Server error", error: error.message });
};

// POST /places
exports.addPlace = async (req, res) => {
  try {
    const place = await Place.create({ ...pickFields(req.body), owner: req.user._id });
    res.status(201).json({ place });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /places?search=goa
exports.getPlaces = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = {};
    if (search && search.trim()) {
      const regex = new RegExp(escapeRegex(search.trim()), "i");
      filter.$or = [{ title: regex }, { address: regex }];
    }
    const places = await Place.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ places });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /places/user-places
exports.getUserPlaces = async (req, res) => {
  try {
    const places = await Place.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ places });
  } catch (error) {
    handleError(res, error);
  }
};

// GET /places/:id
exports.getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate("owner", "name picture");
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ place });
  } catch (error) {
    handleError(res, error);
  }
};

// PUT /places/:id (owner only)
exports.updatePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    if (place.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only edit your own places" });
    }
    place.set(pickFields(req.body));
    await place.save();
    res.status(200).json({ place });
  } catch (error) {
    handleError(res, error);
  }
};

// DELETE /places/:id (owner only)
exports.deletePlace = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    if (place.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "You can only delete your own places" });
    }
    await place.deleteOne();
    res.status(200).json({ message: "Place deleted" });
  } catch (error) {
    handleError(res, error);
  }
};