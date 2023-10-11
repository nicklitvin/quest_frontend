import App from "../App";
import { render, fireEvent } from "@testing-library/react-native";
import { testIDs, texts } from "../GlobalConstants";
import { data_store } from "../Store";

describe("settings page" , () => {
    it("should change theme", async () => {
        const app = render(<App/>)

        const before_theme = data_store.getState().preferences.theme;
        expect(before_theme == "Dark").toEqual(true);

        const before_press_list = await app.findAllByText(texts.theme_light);
        const select_light = await app.findByTestId(testIDs.theme_select_light);
        fireEvent.press(select_light);

        const after_press_list = await app.findAllByText(texts.theme_light);
        expect(after_press_list.length).toEqual(before_press_list.length + 1);

        const after_theme = data_store.getState().preferences.theme;
        expect(after_theme == "Light").toEqual(true);
    })
})
