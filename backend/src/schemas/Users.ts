import {model, Schema}  from "mongoose";

export interface userInterface {
    id : string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const UserSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String
});

export const User = model('User', UserSchema);
