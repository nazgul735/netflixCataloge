//import { model, Schema } from  'mongoose';
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

const User = mongoose.model('User', UserSchema);

export default User;
