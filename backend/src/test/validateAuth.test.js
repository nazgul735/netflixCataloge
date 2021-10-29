
import validateAuth from '../../util/validateAuth.js';

test('verifying if token is legal', () => {
    validateAuth(context) = jest.fn();
    validateAuth.authHeader = jest.fn("Bearer 123");
    expect(!(validateAuth.authHeader)).toThrow('Authorization header must be provided');
})


