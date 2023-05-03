const fs = require("fs");
const express = requrie("express");

const app = express();

app.get("/api/users", (req, res) => {
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error reading the file");
      return;
    }

    try {
      const dataArr = JSON.parse(data);
      res.json(dataArr);
    } catch (error) {
      console.log(error);
      res.status(500).send("Error parsing the file");
    }
  });
});

app.listen(5000, () => console.log("Server started"));
