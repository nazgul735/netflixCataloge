//const { model, Schema } = require('mongoose');

//const UserSchema = new Schema({
//import { model, Schema } from  'mongoose';
import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

export const User = mongoose.model('User', UserSchema);
