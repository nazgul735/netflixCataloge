import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { SECRET_KEY  } from "../src/config.js";

 const validateAuth = ({contex}) => {
    const authHeader = contex.req.headers.authorization
    console.log(authHeader)
    if (authHeader) {
      // Bearer ....
      const token = authHeader.split('Bearer ')[1];
      console.log(token);
      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          return user;
        } catch (err) {
          throw new AuthenticationError('Invalid/Expired token');
        }
      }
      throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
  };
export default validateAuth
