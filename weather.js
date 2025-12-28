const express = require("express");
const mongoose = require("mongoose");
const Weather = require("./models/weather");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Weather DB connected"))
  .catch(err => console.error(err));

app.get("/weather/:city", async (req, res) => {
  try {
    const city = req.params.city;
    const data = await Weather.findOne({ city: new RegExp(city, "i") });
    if (!data) return res.status(404).json({ error: "City not found" });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//AJAX Suggestion API

// Suggest cities based on query
app.get("/weather-suggest", async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json([]);

    const matches = await Weather.find({ city: new RegExp(q, "i") })
                                 .limit(5)
                                 .select("city -_id");

    const cityNames = matches.map(m => m.city);
    res.json(cityNames);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// app.get("/weather-suggest",async(req,res)=>{
//   try{
//     const q = req.query.q;
//     if(!q) return res.json([]);

//     const cities = await Weather.find(
//       {city: new RegExp("^" + q, "i")},
//       {city: 1, _id: 0}
// ).limit(5);

// res.json(cities.map(c=> c.city));
//   } catch(err){
//     res.status(500).json({error: err.message});
//   }
// });



app.listen(4001, "0.0.0.0", () => console.log("Weather running on port 4001"));
