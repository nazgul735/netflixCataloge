const User = require('../..(models/User');
const bcrtpy =require('bcryptjs');
const jwt = require('jsonwebtoken');
const{UserInputError}=require

const {validateRegisterInput} = require('../../util/validators')
const {SECRETE_KEY} = require('../config');
const User = require('../models/User');

function generalToken(user){
    return jwt.sign(
        {
          id: user.id,
          email: user.email,
          username: user.username
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
    }
module.exports = {
    Mutation: {
        async login(_, {username, password}){
            const {errors, valid}=validateRegisterInput(username,password);
            if(!valid){
                throw new UserInputError('Errors', {errors});
            }
            const user=await User.findOne({username});
            if(!user){
                errors.general='User not found';
                throw new UserInputError('User not found', {errors});

            }
            const match =await bcrypt.compare(password, user.password);
            if(!match){
                errors.general='Wrong credential';
                throw new UserInputError('Wrong credentials', {errors});
            }
            const token=generalToken(user);

            return {
                ...user._doc,
                id: user._id,
                token
            };
        },
        async register(
            {
                registerInput:{username, email, password, confirmPassword}
            }
            ){
                const {valid, errors}=validateRegisterInput()
                if(!valid){
                    throw new UserInputError('Errors', {errors})
                }
                const user=await User.findOne({username});
        register(_, {registerInput: {username, email, password, confirmPassword}
        },
         context, 
         info)
         {
            password = await bcrypt.hash(password, 12);
            if(user){
                throw new UserInputError('username is taken', {
                errors: {
                    username: 'This username is taken'
                }

            })
        }


            const newUser = new User({
                email, 
                username,
                password,
                createdAt: new Date().toISOString()
            });
            const res = await newUser.save();
            const token=generalToken(user);

            //const token = jwt.sign({
              //  id: ReadableStream.is,
                //email: res.username
            //}, SECRETE_KEY, {expiresIn: '1h'});

           
        }
    }
};