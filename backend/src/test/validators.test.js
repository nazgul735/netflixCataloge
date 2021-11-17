import { validateLoginInput, validateRegisterInput, validateRegisterInputInterface} from "../util/validators";
//validateLoginInput
test('Confirming that errors of illegal username has value', () => {
    const {errors, valid} = validateLoginInput(" ", "");
    expect(`${errors.username}`).toEqual('Username needs value');
    expect(`${valid}`).toMatch(/[false|null]/);
})

test('Confirming legal values is valid', () => {
    const {errors, valid} = validateLoginInput("test", "test");
    expect(`${valid}`).toMatch(/[true]/);
})

//validateRegisterInput
test('Invalid register values', () => {
    const {errors, valid} = validateRegisterInput({
        username:"",
        email:"",
        password:"password",
        confirmPassword:"passwordNotEqual"}
    );
    expect(`${errors.username}`).toEqual('Username must not be empty');
    expect(`${errors.email}`).toEqual('Email must not be empty');
    expect(`${errors.confirmPassword}`).toEqual('Passwords must match');
    expect(`${valid}`).toMatch(/[false|null]/);
  })

  test('Valid register values', () => {
    const {errors, valid} = validateRegisterInput({
        username:"username",
        email:"email@email.com",
        password:"password",
        confirmPassword:"password"}
    );
    expect(`${valid}`).toMatch(/[true]/);
  })
