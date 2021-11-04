
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { SECRET_KEY  } from "../src/config.ts";

 export const validateAuth = (contex) => {
    const authHeader = contex?.req?.headers?.authorization
    if (authHeader) {
      // Bearer ....
      const token = authHeader
      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          console.log(user)
          return user;
        } catch (err) {
          throw new AuthenticationError('Invalid/Expired token');
        }
      }
      throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
  };
