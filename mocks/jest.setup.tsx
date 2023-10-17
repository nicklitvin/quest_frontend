import { server } from './server';
import { Linking } from 'react-native';

export const opened_links : string[] = [];

jest.mock('expo-localization', () => ({
    getCalendars: jest.fn(() => [{timeZone: "PST"}])
}))

Linking.openURL = jest.fn( async (url : string) => opened_links.push(url))

beforeAll(() => {
    server.listen()
})

afterEach(() => {
    server.resetHandlers()
    opened_links.length = 0;
})

afterAll(() => {
    server.close()
})