"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserLogin = exports.UserRegistration = exports.UserClass = void 0;
const type_graphql_1 = require("type-graphql");
const typegoose_1 = require("@typegoose/typegoose");
let UserClass = class UserClass {
};
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(() => String)
], UserClass.prototype, "username", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(() => String)
], UserClass.prototype, "password", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(() => String)
], UserClass.prototype, "email", void 0);
__decorate([
    typegoose_1.prop({ type: String }),
    type_graphql_1.Field(() => String)
], UserClass.prototype, "createdAt", void 0);
UserClass = __decorate([
    type_graphql_1.ObjectType()
], UserClass);
exports.UserClass = UserClass;
let UserRegistration = class UserRegistration {
};
__decorate([
    type_graphql_1.Field(() => String)
], UserRegistration.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => String)
], UserRegistration.prototype, "email", void 0);
__decorate([
    type_graphql_1.Field(() => String)
], UserRegistration.prototype, "password", void 0);
__decorate([
    type_graphql_1.Field(() => String)
], UserRegistration.prototype, "confirmPassword", void 0);
UserRegistration = __decorate([
    type_graphql_1.ObjectType()
], UserRegistration);
exports.UserRegistration = UserRegistration;
let UserLogin = class UserLogin {
};
__decorate([
    type_graphql_1.Field(() => String)
], UserLogin.prototype, "username", void 0);
__decorate([
    type_graphql_1.Field(() => String)
], UserLogin.prototype, "password", void 0);
UserLogin = __decorate([
    type_graphql_1.ObjectType()
], UserLogin);
exports.UserLogin = UserLogin;
exports.User = typegoose_1.getModelForClass(UserClass);
