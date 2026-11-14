import records from "./demoPlaces.json";

export const demoPlaces = records.map((place, index) => ({
  ...place,
  _id: `demo-${String(index + 1).padStart(2, "0")}`,
  owner: { name: "Staybnb host" },
  isDemo: true,
}));

export const findDemoPlace = (id) => demoPlaces.find((place) => place._id === id);
