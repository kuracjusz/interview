import express from "express";
import cors from "cors";

async function getCities() {
  const response = await fetch(
    "https://samples.openweathermap.org/data/2.5/box/city?bbox=12,32,15,37,10&appid=b6907d289e10d714a6e88b30761fae22s"
  );
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return await response.json();
}

function getCitiesNames(cities, query) {
  const names = cities.list.map((city) => city.name);
  const filteredNames = names.filter((name) =>
    query ? name.startsWith(query.toUpperCase()) : false
  );

  return filteredNames;
}

const app = express();

app.use(cors({ origin: "http://localhost:5173" }));

app.get("/cities", (req, res) => {
  getCities()
    .then((cities) => {
      const filteredNames = getCitiesNames(cities, req.query.query);
      res.json(filteredNames);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
