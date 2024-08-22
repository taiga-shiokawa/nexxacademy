const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inquirySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    enum: ['学生', '会社員', '自営業', 'その他'],
    required: true,
  },
});

module.exports = mongoose.model("Inquiry", inquirySchema);