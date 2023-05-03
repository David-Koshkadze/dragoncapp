const fs = require("fs");
const express = require("express");

const app = express();

app.use(express.json());

function getData() {
  const data = fs.readFileSync("data.json");
  const newData = JSON.parse(data);
  return newData;
}

app.get("/api/users", (req, res) => {
  try {
    const dataArr = getData();
    res.json(dataArr);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading data file");
  }
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const dataArr = getData();
    const data = dataArr.find((item) => item.id === id);
    if (data) {
      res.json(data);
    } else {
      res.status(400).send("Data not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error reading data file");
  }
});

app.listen(5000, () => console.log("Server started"));
