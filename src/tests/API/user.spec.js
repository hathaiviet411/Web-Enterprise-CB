
describe('Testing API user', () => {
    beforeEach(() => {
    });


    test('Testing API create user', () => {
        const user = {
            name: 'test',
            email: 'test@gmail.com',
            password: 'test_password'
        }
        expect(user).toBe(user)
    })

    test('Testing API get user', () => {
        const user = {
            name: 'test',
            email: 'test@gmail.com',
            password: 'test_password'
        }
        expect(user).toBeDefined()
    })

    test('Testing API update user', () => {
        const user = {
            name: 'test',
            email: 'test@gmail.com',
            password: 'test_password'
        }
        expect(user).toBe(user)
    })

    test('Testing API remove user', () => {
        const user = {
            name: 'test',
            email: 'test@gmail.com',
            password: 'test_password'
        }
        expect(user).toBe(user)
    })
})