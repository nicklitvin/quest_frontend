import { fireEvent } from "@testing-library/react-native";
import { testIDs } from "../GlobalConstants";
import { make_custom_app, snooze } from "../mocks/funcs";
import { get_all_response } from "../mocks/handlers";
import { act } from "react-test-renderer";

describe("activity", () => {
    it("should make api call", async () => {
        const { app, store } = await make_custom_app();

        const open_activity = app.getByTestId(testIDs.open_activity);
        fireEvent.press(open_activity);

        const get_all = app.getByTestId(testIDs.get_all);
        
        await act( async () => {
            fireEvent.press(get_all);
            await snooze();
        })
        

        const data = store.getState().server_data;
        expect(data.key).toEqual(get_all_response.key);
        expect(data.activity).toEqual(get_all_response.activity);
        expect(data.events).toEqual(get_all_response.events);
        expect(data.need_update).toEqual(get_all_response.need_update);
    })

    it("should make activity button", async () => {
        const { app, store } = await make_custom_app();

        const open_activity = app.getByTestId(testIDs.open_activity);
        fireEvent.press(open_activity);

        const get_all = app.getByTestId(testIDs.get_all);
        
        await act( async () => {
            fireEvent.press(get_all);
            await snooze();
        })

        expect( 
            (await app.findAllByText(get_all_response.activity[0].title)).length)
        .toEqual(1);
    })
})