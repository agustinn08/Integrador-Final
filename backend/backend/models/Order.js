const mongoose = require('mongoose');

const orderProductSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  name:      { type: String },
  price:     { type: Number },
  quantity:  { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  totalPrice: { type: Number, required: true },
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products:   [orderProductSchema],
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed', 'cancelled', 'refunded', 'delivered'],
    default: 'pending'
  },
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
