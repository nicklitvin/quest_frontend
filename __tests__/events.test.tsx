import { fireEvent } from "@testing-library/react-native";
import { constants, testIDs, texts } from "../GlobalConstants";
import { make_custom_app, snooze } from "../mocks/funcs";
import { InitialState } from "../Store";
import { DateFormat, Theme, Units } from "../components/CustomTypes";
import * as globals from "../GlobalConstants";
import { opened_links } from "../mocks/jest.setup";

describe("events page", () => {
    it("should show events", async () => {
        const server_data : Response_All = {
            key: "key",
            activity: [],
            events: [
                {
                    distance: 1,
                    start_time: "2023-10-15T21:09:59Z",
                    end_time: "2023-10-15T21:09:59Z",
                    event_id: "1",
                    place_id: "id",
                    title: "title",
                    web_link: null
                }
            ],
            need_update: false,
            sights: []   
        }

        const initial_state : InitialState = {
            server_data: server_data,
            preferences: {
                date: DateFormat.dmy,
                theme: Theme.Light,
                units: Units.mi
            }
        }

        const { app, store } = await make_custom_app(initial_state);

        const open_events = app.getByTestId(testIDs.open_events);
        fireEvent.press(open_events);

        const title = await app.findAllByText(server_data.events[0].title);
        expect(title.length).toEqual(1);

        const distance = await app.findAllByText("1mi.");
        expect(distance.length).toEqual(1);

        const time = await app.findAllByText("15/10 2:09pm - 15/10 2:09pm");
        expect(time.length).toEqual(1);

        const claim = app.queryByText(texts.claim_text);
        expect(claim == null).toEqual(true);
    })

    it("shoud not claim event", async () => {
        const server_data : Response_All = {
            key: "key",
            activity: [],
            events: [
                {
                    distance: 1,
                    start_time: "2023-10-15T21:09:59Z",
                    end_time: "2023-10-15T21:09:59Z",
                    event_id: "1",
                    place_id: "id",
                    title: "title",
                    web_link: null
                }
            ],
            need_update: false,
            sights: []   
        }

        const initial_state : InitialState = {
            server_data: server_data,
            preferences: {
                date: DateFormat.dmy,
                theme: Theme.Light,
                units: Units.mi
            }
        }

        const { app, store } = await make_custom_app(initial_state);

        const open_events = app.getByTestId(testIDs.open_events);
        fireEvent.press(open_events);

        const mocker = jest.spyOn(globals,"make_post_request");
        const resolved : Response_Claim = {
            key: "",
            need_update: false,
            valid: false
        }
        mocker.mockResolvedValue(resolved);

        const my_event = app.getByText(server_data.events[0].title);
        fireEvent.press(my_event);

        const title = await app.findAllByText(server_data.events[0].title);
        expect(title.length).toEqual(1);

        expect(store.getState().server_data.events.length).toEqual(1);
        expect(store.getState().server_data.activity.length).toEqual(0);

        expect(opened_links.length).toEqual(1);
    })

    it("shoud claim event", async () => {
        const server_data : Response_All = {
            key: "key",
            activity: [],
            events: [
                {
                    distance: 0,
                    start_time: new Date(Date.now() - 10**8).toISOString(),
                    end_time: new Date(Date.now() + 10**8).toISOString(),
                    event_id: "1",
                    place_id: "id",
                    title: "title",
                    web_link: null
                }
            ],
            need_update: false,
            sights: []   
        }

        const initial_state : InitialState = {
            server_data: server_data,
            preferences: {
                date: DateFormat.dmy,
                theme: Theme.Light,
                units: Units.mi
            }
        }

        const { app, store } = await make_custom_app(initial_state);

        const open_events = app.getByTestId(testIDs.open_events);
        fireEvent.press(open_events);

        const mocker = jest.spyOn(globals,"make_post_request");
        const resolved : Response_Claim = {
            key: "",
            need_update: false,
            valid: true
        }
        mocker.mockResolvedValue(resolved);

        const my_event = app.getByText(globals.texts.claim_text);
        fireEvent.press(my_event);
        await snooze();

        const title = app.queryByText(server_data.events[0].title);
        expect(title).toEqual(null);

        expect(store.getState().server_data.events.length).toEqual(0);
        expect(store.getState().server_data.activity.length).toEqual(1);
    })
})