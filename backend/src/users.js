import User, { findOne } from '../models/User';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
const{UserInputError}=require

import { validateRegisterInput } from '../../util/validators';
import { SECRET_KEY } from './config';
import User from '../models/User';

function generateToken(user){
    return sign(
        {
          id: user.id,
          email: user.email,
          username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
    }
    export const Mutation = {
    async login(_, { username, password }) {
        const { errors, valid } = validateLoginInput(username, password);

        if (!valid) {
            throw new UserInputError('Errors', { errors });
        }

        const user = await findOne({ username });

        if (!user) {
            errors.general = 'User not found';
            throw new UserInputError('User not found', { errors });
        }

        const match = await compare(password, user.password);
        if (!match) {
            errors.general = 'Wrong crendetials';
            throw new UserInputError('Wrong crendetials', { errors });
        }

        const token = generateToken(user);

        return {
            ...user._doc,
            id: user._id,
            token
        };
    },
    async register(
        _,
        {
            registerInput: { username, email, password, confirmPassword }
        }
    ) {
        const { valid, errors } = validateRegisterInput(
            username,
            email,
            password,
            confirmPassword
        );
        if (!valid) {
            throw new UserInputError('Errors', { errors });
        }
        const user = await findOne({ username });
        register(_, {
            registerInput: { username, email, password, confirmPassword }
        },
            context,
            info);
        {
            password = await hash(password, 12);
            if (user) {
                throw new UserInputError('username is taken', {
                    errors: {
                        username: 'This username is taken'
                    }
                });
            }


            const newUser = new User({
                email,
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token = generalToken(user);



        };
    }
};