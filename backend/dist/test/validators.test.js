"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validators_1 = require("../util/validators");
//validateLoginInput
test('Confirming that errors of illegal username has value', () => {
    const { errors, valid } = (0, validators_1.validateLoginInput)(" ", "");
    expect(`${errors.username}`).toEqual('Username needs value');
    expect(`${valid}`).toMatch(/[false|null]/);
});
test('Confirming legal values is valid', () => {
    const { errors, valid } = (0, validators_1.validateLoginInput)("test", "test");
    expect(`${valid}`).toMatch(/[true]/);
});
//validateRegisterInput
test('Invalid register values', () => {
    const { errors, valid } = (0, validators_1.validateRegisterInput)("", "", "password", "passwordNotEqual");
    expect(`${errors.username}`).toEqual('Username must not be empty');
    expect(`${errors.email}`).toEqual('Email must not be empty');
    expect(`${errors.confirmPassword}`).toEqual('Passwords must match');
    expect(`${valid}`).toMatch(/[false|null]/);
});
test('Valid register values', () => {
    const { errors, valid } = (0, validators_1.validateRegisterInput)("username", "email@email.com", "password", "password");
    expect(`${valid}`).toMatch(/[true]/);
});
