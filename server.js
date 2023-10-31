const express = require('express');
const app = express();
const mongoose = require('mongoose');
​
/* require and configure .env*/
require("dotenv").config({ path: "./config/.env" });
const url = process.env.MONGO_URI;

/* require user model*/
const User = require("./models/User");
/* connect to mongodb*/
mongoose.connect(
  url,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => (err ? console.log(err) : console.log("Database connected"))
);

app.use(express.json());


/*find users*/
app.get("/users", (req, res) =>
  User.find()
    .then((el) => res.json(el))
    .catch((err) => console.log(err))
);

  /*add user*/
app.post("/add_user", (req, res) => {
  const { lastName, firstName, emailAddress, phoneNumber } = req.body;
  let newUser = new User({ lastName, firstName, emailAddress, phoneNumber });
  newUser
    .save()
    .then(() => res.json({ msg: "User added " }))
    .catch((err) => console.log(err));
});

 /* edit user by id*/
app.put("/edit_user/:id", (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, (err) => {
    if (err) throw err;
    User.findById(req.params.id)
      .then((el) => res.json(el))
      .catch((err) => console.log(err));
  });
});

/* delete user by id*/
app.delete("/delete_user/:id", (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json({ msg: "User deleted." }))
    .catch((err) => console.log(err));
});

/*port set up*/
app.listen(4000, (err) =>
  err ? console.log(err) : console.log("App is listening on 4000.")
);
  
