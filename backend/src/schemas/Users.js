"use strict";
exports.__esModule = true;
exports.User = void 0;
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String
});
exports.User = (0, mongoose_1.model)('User', UserSchema);
