const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  birthdate:{ type: String },
  country:  { type: String },
  role:     { type: String, enum: ['admin', 'client'], default: 'client' },
  photo:    { type: String, default: '' },
  createdAt:{ type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
