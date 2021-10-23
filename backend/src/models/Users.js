<<<<<<< HEAD
const { model, Schema } = require('mongoose');

const UserSchema = new Schema({
=======
//import { model, Schema } from  'mongoose';
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
>>>>>>> 8dd2aee2751bc9b2f798cf2af637331d1412b598
  username: String,
  password: String,
  email: String,
  createdAt: String
});

<<<<<<< HEAD
export const User = model('User', UserSchema);
=======
const User = mongoose.model('User', UserSchema);

export default User;
>>>>>>> 8dd2aee2751bc9b2f798cf2af637331d1412b598
