const mongoose = require("mongoose");

const cryptoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a cryptocurrency name"],
    trim: true,
    unique: true,
  },
  symbol: {
    type: String,
    required: [true, "Please provide a symbol"],
    uppercase: true,
    unique: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide a price"],
    min: 0,
  },
  image: {
    type: String,
    required: [true, "Please provide an image URL"],
  },
  change24h: {
    type: Number,
    default: 0,
    // This represents percentage change, can be positive or negative
  },
}, { timestamps: true });

module.exports = mongoose.model("Crypto", cryptoSchema);
