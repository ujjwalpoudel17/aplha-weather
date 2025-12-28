const mongoose = require("mongoose");

const WeatherSchema = new mongoose.Schema({
  city: String,
  province: String,
  lat: Number,
  lon: Number,
  temperature: String,
  humidity: String,
  condition: String
}, { collection: "weather" });

module.exports = mongoose.model("Weather", WeatherSchema);
