const { Schema, model } = require("mongoose");

const schema = new Schema({
  fio: { type: String, require: true },
  email: { type: String, require: true },
  tel: { type: String, require: true },
  correct: { type: Number, require: true },
  unanswered: { type: Number, require: true },
});

module.exports = model("User", schema);
