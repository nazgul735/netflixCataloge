const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

export const User = model('User', UserSchema);
