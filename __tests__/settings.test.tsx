import { fireEvent } from "@testing-library/react-native";
import { DateFormat, Theme, Units, testIDs } from "../GlobalConstants";
import { make_custom_app } from "../mocks/funcs";

describe("settings page" , () => {

    it("setup custom store", async() => {
        const initial_state = {
            preferences : {
                date: DateFormat.dmy,
                theme: Theme.Light,
                units: Units.km
            }
        }
        const { app, store } = await make_custom_app(initial_state);

        const data = store.getState();
        expect(data.preferences.date).toEqual(DateFormat.dmy);
        expect(data.preferences.theme).toEqual(Theme.Light);
        expect(data.preferences.units).toEqual(Units.km);
    })

    it("should change theme", async () => {
        const initial_state = {
            preferences : {
                theme: Theme.Light,
            }
        }
        const { app, store } = await make_custom_app(initial_state);

        expect(store.getState().preferences.theme).toEqual(
            initial_state.preferences.theme
        );

        const settings_button = app.getByTestId(testIDs.open_settings);
        fireEvent.press(settings_button);

        const light_button = app.getByTestId(testIDs.theme_select_light);
        const dark_button = app.getByTestId(testIDs.theme_select_dark);

        fireEvent.press(dark_button);
        expect(store.getState().preferences.theme).toEqual(Theme.Dark);

        fireEvent.press(light_button);
        expect(store.getState().preferences.theme).toEqual(Theme.Light);
    })

    it("should change date", async () => {
        const initial_state = {
            preferences : {
                date: DateFormat.ymd
            }
        }
        const { app, store } = await make_custom_app(initial_state);

        const settings_button = app.getByTestId(testIDs.open_settings);
        fireEvent.press(settings_button);

        const dmy_button = app.getByTestId(testIDs.date_select_dmy);
        const mdy_button = app.getByTestId(testIDs.date_select_mdy);
        const ymd_button = app.getByTestId(testIDs.date_select_ymd);

        fireEvent.press(dmy_button);
        expect(store.getState().preferences.date).toEqual(DateFormat.dmy);

        fireEvent.press(mdy_button);
        expect(store.getState().preferences.date).toEqual(DateFormat.mdy);

        fireEvent.press(ymd_button);
        expect(store.getState().preferences.date).toEqual(DateFormat.ymd);
    })

    it("should change units", async () => {
        const initial_state = {
            preferences : {
                units: Units.mi
            }
        }
        const { app, store } = await make_custom_app(initial_state);

        const settings_button = app.getByTestId(testIDs.open_settings);
        fireEvent.press(settings_button);

        const km_button = app.getByTestId(testIDs.units_select_km);
        const mi_button = app.getByTestId(testIDs.units_select_mi);

        fireEvent.press(km_button);
        expect(store.getState().preferences.units).toBe(Units.km);
        
        fireEvent.press(mi_button);
        expect(store.getState().preferences.units).toBe(Units.mi);
    })
})
