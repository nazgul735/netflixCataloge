<<<<<<< HEAD
=======

>>>>>>> 5bc86fdc35b2d744990d191e574130c9d946557e
import { AuthenticationError } from 'apollo-server';
import jwt from 'jsonwebtoken';
import { SECRET_KEY  } from "../src/config.js";

<<<<<<< HEAD
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
=======
 export const validateAuth = (contex) => {
    const authHeader = contex.req.headers.authorization
    if (authHeader) {
      // Bearer ....
      const token = authHeader
      if (token) {
        try {
          const user = jwt.verify(token, SECRET_KEY);
          console.log(user)
>>>>>>> 5bc86fdc35b2d744990d191e574130c9d946557e
          return user;
        } catch (err) {
          throw new AuthenticationError('Invalid/Expired token');
        }
      }
      throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
  };
<<<<<<< HEAD
export default validateAuth
=======
>>>>>>> 5bc86fdc35b2d744990d191e574130c9d946557e
