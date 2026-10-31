const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "Author", required: true },
    description: { type: String, trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    category: { type: String, trim: true },
    cover: { type: String, default: null }, // path of the uploaded image
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
