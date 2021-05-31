const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const { dirname } = require("path");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

mongoose.connect(
  "mongodb://localhost:27017/Emails",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const NewsletterSchema = new mongoose.Schema({
  email: String,
});

const Newsletter = mongoose.model("Newsletter", NewsletterSchema);

app.use(express.static(path.join(__dirname, "Site")));

app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "Site", "Aycee.html"));
});
app.get("/Main", (req, res) => {
  res.require.sendFile(__dirname + "/Main.html");
});
app.get("/Music", (req, res) => {
  res.require.sendFile(__dirname + "/Music.html");
});
app.get("/Subscribe", (req, res) => {
  res.sendFile(__dirname + "/Subscribe.html");
});
app.get("/Latest", (req, res) => {
  res.sendFile(__dirname + "/Latest.html");
});
app.get("/Thanks", (req, res) => {
  res.sendFile(__dirname + "/Thanks.html");
});

app.post("/Subscribe", async (req, res) => {
  let formEmail = req.body.email;
  try {
    let emailQuery = await Newsletter.findOne({ email: formEmail });
    if (!emailQuery) {
      let newEmail = new Newsletter({
        email: req.body.email,
      });
      newEmail.save();
      res.redirect("Thanks.html");
    } else {
      res.redirect("Member.html");
    }
  } catch (err) {
    console.log(err);
    res.redirect("Main.html");
  }
});

app.listen(port, () => {
  console.log("Server running at http://localhost:27017");
});
