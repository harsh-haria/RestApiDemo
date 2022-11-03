const express = require("express");
const fs = require("fs");
const PORT = 8080;

const file = require("./input.json");

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

const getDataFromFile = (cb) => {
  fs.readFile("input.json", (err, fileData) => {
    if (err) cb([]);
    else {
      cb(JSON.parse(fileData));
    }
  });
};

app.use(express.json());

app.get("/tshirt", (req, res) => {
  res.status(200).send({
    tshirt: "Blackberry",
    size: "Large",
  });
});

app.post("/tshirt/:id", (req, res) => {
  const id = req.params.id;
  const logo = req.body.logo;
  if (!logo) {
    return res.status(418).send({ message: "The logo field cannot be empty!" });
  }
  res
    .status(200)
    .send({ message: `Here is your tshirt with ${logo} and id of ${id}` });
});

app.get("/file", (req, res) => {
  let file;
  fs.readFile("input.json", (err, data) => {
    if (!err) {
      file = JSON.parse(data);
      return res.status(200).send(file);
    } else {
      return res.status(500).send({ message: "An error occured!" });
    }
  });
});

app.post("/file/post/:user", (req, res) => {
  getDataFromFile((users) => {
    users.push({ name: req.params.user });
    fs.writeFile("input.json", JSON.stringify(users), (err) => {
      if (err) throw err;
      res.status(200).send({ message: "Data stored correctly!" });
    });
  });
});

app.post("/file/delete/:user", (req, res) => {
  const userData = req.params.user;
  console.log(userData);
  getDataFromFile((users) => {
    const updatedUsers = users.filter((u) => u.name !== userData);
    fs.writeFile("input.json", JSON.stringify(updatedUsers), (err) => {
      if (err) throw err;
      return res.status(200).send({ message: "User Deleted!" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`The server is live at http://localhost:${PORT}`);
});
