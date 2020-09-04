const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
  name: String,
  email: String,
  avatar: String,
  googleId: String,
  bio: String,
  myRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe'}],
  following: [{ type: Schema.Types.ObjectId, ref: 'User'}],
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);