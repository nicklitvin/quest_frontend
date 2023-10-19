import { fireEvent } from "@testing-library/react-native";
import { make_custom_app, snooze } from "../mocks/funcs";
import { testIDs } from "../GlobalConstants";
import * as globals from "../GlobalConstants";
import { InitialState } from "../Store";
import { DateFormat, Theme, Units } from "../components/CustomTypes";
import { opened_links } from "../mocks/jest.setup";

describe("sights", () => {
    it("should show sights", async () => {
        const server_data : Response_All = {
            key: "key",
            activity: [],
            events: [],
            need_update: false,
            sights: [
                {
                    distance: 0,
                    place_id: "id",
                    title: "title1"
                }
            ]
        };

        const initial_state : InitialState = {
            server_data: server_data
        };

        const { app, store } = await make_custom_app(initial_state);
        
        const sights_button = app.getByTestId(testIDs.open_sights);
        fireEvent.press(sights_button);

        const sights = await app.findAllByText(server_data.sights[0].title);
        expect(sights.length).toEqual(1);
    })

    it("should claim sight", async () => {
        const server_data : Response_All = {
            key: "key",
            activity: [],
            events: [],
            need_update: false,
            sights: [
                {
                    distance: 0,
                    place_id: "id",
                    title: "title1"
                }
            ]
        };

        const initial_state : InitialState = {
            server_data: server_data,
            preferences: {
                units: Units.mi,
                date: DateFormat.dmy,
                theme: Theme.Light
            }
        };

        const { app, store } = await make_custom_app(initial_state);

        const sights_button = app.getByTestId(testIDs.open_sights);
        fireEvent.press(sights_button);

        const mocker = jest.spyOn(globals,"make_post_request");
        const resolved : Response_Claim = {
            key: "",
            need_update: false,
            valid: true
        }
        mocker.mockResolvedValue(resolved);

        const claimable_sight = app.getByText(globals.texts.claim_text);
        fireEvent.press(claimable_sight);
        await snooze();

        expect(store.getState().server_data.activity.length).toEqual(1);
        expect(store.getState().server_data.sights.length).toEqual(0);
        expect(app.queryByText(server_data.sights[0].title)).toEqual(null);

        const activity_button = app.getByTestId(testIDs.open_activity);
        fireEvent.press(activity_button);

        const activity_title = await app.findAllByText(server_data.sights[0].title);
        expect(activity_title.length).toEqual(1);

        const activity_distance = await app.findAllByText("0mi.");
        expect(activity_distance.length).toEqual(1);
    })

    it("should not claim sight", async () => {
        const server_data : Response_All = {
            key: "key",
            activity: [],
            events: [],
            need_update: false,
            sights: [
                {
                    distance: 1,
                    place_id: "id",
                    title: "title1"
                }
            ]
        };

        const initial_state : InitialState = {
            server_data: server_data
        };

        const { app, store } = await make_custom_app(initial_state);

        const sights_button = app.getByTestId(testIDs.open_sights);
        fireEvent.press(sights_button);

        const mocker = jest.spyOn(globals,"make_post_request");
        const resolved : Response_Claim = {
            key: "",
            need_update: false,
            valid: false
        }
        mocker.mockResolvedValue(resolved);

        const claimable_sight = app.getByText(server_data.sights[0].title);
        fireEvent.press(claimable_sight);
        await snooze();

        expect(store.getState().server_data.activity.length).toEqual(0);
        expect(store.getState().server_data.sights.length).toEqual(1);
        expect(app.queryByText(server_data.sights[0].title) != null).toEqual(true);
    })

    it("should redirect to sight contribute", async () => {
        const { app, store } = await make_custom_app();
        
        const open_sights = app.getByTestId(testIDs.open_sights);
        fireEvent.press(open_sights);

        const contribute = app.getByText(globals.texts.add_sight_title);
        fireEvent.press(contribute);

        expect(opened_links.length).toEqual(1);
        expect(opened_links[0]).toEqual(globals.urls.contribute_sight);
    })
})