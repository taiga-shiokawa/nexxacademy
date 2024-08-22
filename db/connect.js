const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url).then(() => {
    console.log("DBコネクト成功!!");
  }).catch ((err) => {
    console.log("DBコネクト失敗...", err);
  })
};

module.exports = connectDB;