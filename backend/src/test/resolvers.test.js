import resolvers from '../resolvers'
import request from 'supertest'

describe("POST /users", () => {
    describe("create review without rating and validate authorization", () => {
        test("", async () => {
            
            })
            expect().
          })
    
          const registerMutation = `
mutation Register($data: RegisterInput!) {
  register(
    data: $data
  ) {
    username,
    email,
    password,
    confirmPassword
    
  }
}
`;

describe("Register", () => {
    it("create user", async () => {
      const user = {
        usernameName: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        confirmPassword: faker.internet.confirmPassword()
      };

    expect(response).toMatchObject({
    data: {
        me: {
        id: `${user.id}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
        }
    }
    });
});
}
}
