const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },

    redirectURL: {
      type: String,
      required: true,
    },

    visitedHistory: [{ timestamps: { type: Number } }],
  },
  { timestamps: true }
);

const UrlShortner = mongoose.model("UrlShortner", UrlSchema);
module.exports = UrlShortner;
