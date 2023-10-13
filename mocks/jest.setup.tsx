import { server } from './server';

jest.mock('expo-localization', () => ({
    getCalendars: jest.fn(() => [{timeZone: "PST"}])
}))

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
})

afterAll(() => {
    server.close()
})