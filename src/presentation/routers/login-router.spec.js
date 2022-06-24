const LoginRouter = require('./login-router');
const MissingParamsError = require('../helpers/missing-param-error');

const makeSup = () => {
    return new LoginRouter();
}

describe('Login Router', () => {
    test('Should return 400 if no email is provided', () => {
        const sut = makeSup();
        const httpRequest = {
            body: { 
                password: 'password'
            }
        };
        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamsError('email'));
    });

    test('Should return 400 if no password is provided', () => {
        const sut = makeSup();
        const httpRequest = {
            body: { 
                email: 'email@mail.com'
            }
        };
        const httpResponse = sut.route(httpRequest);

        expect(httpResponse.statusCode).toBe(400);
        expect(httpResponse.body).toEqual(new MissingParamsError('password'));
    })

    test('Should return 500 if no httpRequest is provided', () => {
        const sut = makeSup();
        const httpResponse = sut.route();
        expect(httpResponse.statusCode).toBe(500);
    })

    test('Should return 500 if no body is provided', () => {
        const sut = makeSup();
        const httpResponse = sut.route({});
        expect(httpResponse.statusCode).toBe(500);
    })
});
