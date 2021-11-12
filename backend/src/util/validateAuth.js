"use strict";
exports.__esModule = true;
exports.validateAuth = void 0;
var apollo_server_1 = require("apollo-server");
var jsonwebtoken_1 = require("jsonwebtoken");
var config_1 = require("../config");
var validateAuth = function (context) {
    var authHeader = context.req.headers.authorization;
    if (authHeader) {
        // Bearer ....
        var token = authHeader;
        if (token) {
            try {
                var user = jsonwebtoken_1["default"].verify(token, config_1.SECRET_KEY);
                console.log(user);
                return user;
            }
            catch (err) {
                throw new apollo_server_1.AuthenticationError('Invalid/Expired token');
            }
        }
        throw new Error("Authentication token must be 'Bearer [token]");
    }
    throw new Error('Authorization header must be provided');
};
exports.validateAuth = validateAuth;
