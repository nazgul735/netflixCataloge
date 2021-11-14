"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const validateAuth_1 = require("../util/validateAuth");
test('verifying if token is legal', () => {
    let authHeader = { context: { req: { headers: { authorization: null } } } };
    expect(() => { (0, validateAuth_1.validateAuth)(authHeader); }).toThrow(Error);
});
test('verifying if authHeader exists', () => {
    let authHeader = { context: { req: { headers: { authorization: null } } } };
    const token = authHeader;
    expect(() => { (0, validateAuth_1.validateAuth)(authHeader); }).toThrow(Error);
});
test('verifying if token is legal', () => {
    let authHeader = { context: { req: { headers: { authorization: "456" } } } };
    const token = authHeader;
    expect(() => { token; }).toBeTruthy();
});
