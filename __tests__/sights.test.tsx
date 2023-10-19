import { fireEvent } from "@testing-library/react-native";
import { make_custom_app, snooze } from "../mocks/funcs";
import { act } from "react-test-renderer";
import { testIDs } from "../GlobalConstants";
import * as globals from "../GlobalConstants";

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
                    id: "id",
                    title: "title1"
                }
            ]
        };

        const initial_state = {
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
                    id: "id",
                    title: "title1"
                }
            ]
        };

        const initial_state = {
            server_data: server_data
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

        const claimable_sight = app.getByText(server_data.sights[0].title);
        fireEvent.press(claimable_sight);
        await snooze();

        expect(store.getState().server_data.activity.length).toEqual(1);
        expect(store.getState().server_data.sights.length).toEqual(0);
        expect(app.queryByText(server_data.sights[0].title)).toEqual(null);
    })
})