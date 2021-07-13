const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");
const fs = require("fs");
let app = express();

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

app.get("/order/:url", (req, res, next) => {
  let url = req.params.url;
  res.send(url);
  console.log(req.url);
  next();
});

app.use(express.urlencoded({ extended: false }));

app.post("/formsubmissions", (req, res) => {
  res.send(`thank you ${req.body.name} for submitting ${req.body.email}`);
  let nameArr = [];

  if (fs.existsSync("../form.json")) {
    console.log("json exists");
    fs.readFile("../form.json", function (err, data) {
      let info = JSON.parse(data);
      console.log(info);
    });
    //nameArr = [...nameArr, { name: req.body.name, email: req.body.email }];
    /* fs.appendFileSync("../form.json", JSON.stringify(nameArr), function (err) {
      if (err) throw err;
    });*/
  } else {
    nameArr.push({ name: req.body.name, email: req.body.email });

    fs.writeFile("form.json", JSON.stringify(nameArr), function (err) {
      if (err) throw err;
    });
  }
});

app.listen(3000);
