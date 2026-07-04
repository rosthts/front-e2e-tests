export type UserCredentials = {
    email: string;
    password: string;
}

export const VALID_USER: UserCredentials = {
    email: process.env.TEST_USER_EMAIL ?? 'test@example.com',
    password: process.env.TEST_USER_PASSWORD ?? 'password',
}

export function createUser(overrides: Partial<UserCredentials> = {}) {
    return {
        ...VALID_USER,
        ...overrides,
    }
}

export const INVALID_CREDENTIALS_CASES: Array<{ name: string } & UserCredentials> = [
    { name: 'wrong email, correct password', email: 'wrong@example.com', password: VALID_USER.password },
    { name: 'correct email, wrong password', email: VALID_USER.email, password: 'wrongpassword' },
    { name: 'wrong email, wrong password', email: 'wrong@example.com', password: 'wrongpassword' },
];