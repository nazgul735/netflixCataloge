import { validateLoginInput } from "../../util/validators";
//validateRegisterInput

test('Confirming that username has value', () => {
    const mock =validateLoginInput(" ", "123");
    expect(mock.username.trim() === '').toThrow('Username needs value');
})

//validateLoginInput