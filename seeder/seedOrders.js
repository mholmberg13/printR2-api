const Order = require("../models/Order.js");
const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orders';

const orders = [   
  new Order({
    firstName:
      "Matt",
    lastName: "Holmberg",
    email: "matts@gmail.com",
    file: "blahblah.jpg"
  }),]
//connect mongoose
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then(() => console.log('Mongo Database Connected'))
.catch(err => console.log(err))
//save your data. this is an async operation
//after you make sure you seeded all the orders, disconnect automatically
orders.map(async (p, index) => {
  await p.save((err, result) => {
    if (index === orders.length - 1) {
      console.log("DONE!");
      mongoose.disconnect();
    }
  });
});