import App from "../App";
import { render, fireEvent } from "@testing-library/react-native";
import { DateFormat, Theme, Units, testIDs, texts } from "../GlobalConstants";
import { data_store } from "../Store";

describe("settings page" , () => {
    it("should change theme", async () => {
        const app = render(<App/>)

        const light_button = app.getByTestId(testIDs.theme_select_light);
        const dark_button = app.getByTestId(testIDs.theme_select_dark);

        fireEvent.press(light_button);
        expect(data_store.getState().preferences.theme).toEqual(Theme.Light);

        fireEvent.press(dark_button);
        expect(data_store.getState().preferences.theme).toEqual(Theme.Dark);
    })

    it("should change date", async () => {
        const app = render(<App/>)

        const dmy_button = app.getByTestId(testIDs.date_select_dmy);
        const mdy_button = app.getByTestId(testIDs.date_select_mdy);
        const ymd_button = app.getByTestId(testIDs.date_select_ymd);

        fireEvent.press(dmy_button);
        expect(data_store.getState().preferences.date).toEqual(DateFormat.dmy);

        fireEvent.press(mdy_button);
        expect(data_store.getState().preferences.date).toEqual(DateFormat.mdy);

        fireEvent.press(ymd_button);
        expect(data_store.getState().preferences.date).toEqual(DateFormat.ymd);
    })

    it("should change units", async () => {
        const app = render(<App/>);

        const km_button = app.getByTestId(testIDs.units_select_km);
        const mi_button = app.getByTestId(testIDs.units_select_mi);

        fireEvent.press(km_button);
        expect(data_store.getState().preferences.units).toBe(Units.km);

        fireEvent.press(mi_button);
        expect(data_store.getState().preferences.units).toBe(Units.mi);
    })
})
