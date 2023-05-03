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

app.post("/api/users/", (req, res) => {
  try {
    const dataArr = getData();
    const newId = dataArr.length > 0 ? dataArr[dataArr.length - 1].id + 1 : 1;

    const newData = { id: newId, ...req.body };

    dataArr.push(newData);

    fs.writeFileSync("data.json", JSON.stringify(dataArr));
    res.json(newData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error writing to data file");
  }
});

app.put("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const dataArr = getData();

    const dataIdx = dataArr.findIndex((item) => item.id === id);

    if (dataIdx >= 0) {
      const updatedData = { ...dataArr[dataIdx], ...req.body };

      dataArr[dataIdx] = updatedData;

      fs.writeFileSync("data.json", JSON.stringify(dataArr));
      res.json(updatedData);
    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error writing to data file");
  }
});

app.delete("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const dataArr = getData();
    const dataIdx = dataArr.findIndex((item) => item.id === id);

    if (dataIdx >= 0) {
      const deletedData = dataArr.splice(dataIdx, 1);

      fs.writeFileSync("data.json", JSON.stringify(dataArr));
      res.json(deletedData[0]);

    } else {
      res.status(404).send("Data not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error writing to data file");
  }
});

app.listen(5000, () => console.log("Server started"));
