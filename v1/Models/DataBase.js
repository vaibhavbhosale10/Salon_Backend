// connect your application to mongodb server

const mongoose = require("mongoose"); //npm i mongoose
const url =
  "mongodb+srv://shraddha:salon123@salon.hhtiy3g.mongodb.net/salon?retryWrites=true&w=majority";

mongoose.connect(url); //create default connection

// to access default connection
const connect = mongoose.connection;

// to listen the events of the connection
connect.on("connected", () => {
  console.log("Connected to DataBase");
});

connect.on("disconnected", () => {
  console.log("Disconnected from DataBase");
});

connect.on("error", () => {
  console.log("Could not connected to DataBase", err);
});
