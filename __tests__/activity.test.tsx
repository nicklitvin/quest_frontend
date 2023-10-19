import { fireEvent } from "@testing-library/react-native";
import { testIDs } from "../GlobalConstants";
import { make_custom_app, snooze } from "../mocks/funcs";
import { opened_links } from "../mocks/jest.setup";

describe("activity", () => {
    it("should make activity button", async () => {
        const server_data : Response_All = {
            key: "",
            events: [],
            need_update: false,
            sights: [],
            activity: [
                {
                    date: "2023-10-15T21:09:59Z",
                    distance: 0,
                    id: "id",
                    title: "title"
                }
            ]
        }

        const initial_state = {
            server_data: server_data
        }

        const { app, store } = await make_custom_app(initial_state);

        const open_activity = app.getByTestId(testIDs.open_activity);
        fireEvent.press(open_activity);

        const title = server_data.activity[0].title;
        const activities = await app.findAllByText(title);
        expect(activities.length).toEqual(1);

        expect(opened_links.length).toEqual(0);
        fireEvent.press(activities[0]);
        await snooze();
        expect(opened_links.length).toEqual(1);
    })
})