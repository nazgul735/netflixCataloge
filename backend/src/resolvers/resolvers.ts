import { Movie } from "../schemas/Movies";
import { Review } from "../schemas/Reviews";
import { User } from "../schemas/Users";
import { SECRET_KEY } from "../config.js";

import {
    validateRegisterInput,
    validateLoginInput,
  } from "../util/validators";
import {validateAuth} from "../util/validateAuth";
import { createMovieQuery } from "../util/createMovieQuery";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserInputError } from "apollo-server";

type User = {
    id : string,
    username: string,
    email: string,
  }

function generateToken(_user:User) {
    return jwt.sign(
        {
          id: _user.id,
          email: _user.email,
          username: _user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
    }


