const User = require('../..(models/User');
const bcrtpy =require('bcryptjs');
const jws = require('jsonwebtoken');

const {SECRETE_KEY} = require('../config');
const User = require('../models/User');

module.exports = {
    Mutation: {
        register(_, {registerInput: {username, email, password, confirmPassword}
        },
         context, 
         info)
         {
            //Validate user data
            //Make sure user doesn't already excist
            //hash password abd create an auth token
            password = await bcrypt.hash(password, 12);

            const newUser = new User({
                email, 
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();

            const token = jwt.sign({
                id: ReadableStream.is,
                email: res.username
            }, SECRETE_KEY, {expiresIn: '1h'});

            return {
                ...res_doc,
                id: res_id,
                token
            };
        }
    }
};