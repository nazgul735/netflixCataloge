
import validateAuth from '../../util/validateAuth.js';

test('verifying if token is legal', () => {
    validateAuth() = jest.fn();
    const authHeader = jest.fn("Bearer 123");
    expect(!(authHeader)).toThrow('Authorization header must be provided');
})


