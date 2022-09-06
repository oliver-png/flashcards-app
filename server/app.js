require('dotenv').config();
const express = require("express");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cors = require("cors");
const mongoose = require('mongoose');
const session = require("express-session");
const User = require('./user');
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);


mongoose.connect(process.env.MONGO_URI, () => {
  console.log("mongodb connected");
});

const defaultDeck = {
  name: "Your first deck",
  cards: [
    {
      question: "What planet is furthest from the sun?",
      answer: "Neptune"
    }
  ],
  dateCreated: new Date().toLocaleDateString()
};

// app.get("/", async (req, res) => {
//   const user = await User.findById("631416d145ce52483abafb2e");
//   user.cards.push(newCard);
//   res.send(user);
// });


app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user){
      res.send({error: "Username or password incorrect"})
    } else {
      req.logIn(user, err => {
        if (err){
          res.send({error: err});
        }

        res.send(req.user);

      });
    }
  })(req, res, next);
});

app.post("/register", async (req, res) =>{
  try{
    const user = await User.findOne({username: req.body.username}).exec();

    if (!user){
      const hash = await bcrypt.hash(req.body.password, 10);

      const newUser = new User({
        username: req.body.username,
        password: hash
      });

      newUser.decks.push(defaultDeck);

      await newUser.save();
      res.send("User created");
    } else {
      res.send({error: "user already exists"});
    }

  } catch(err){
    res.send({error: err});
    throw err;
  }

});

app.post("/auth", (req, res) => {
  if (req.user){
    res.send(req.user)
  } else {
    res.send({error: "User not logged in"});
  }
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});