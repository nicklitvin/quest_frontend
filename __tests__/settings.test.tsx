import { render, fireEvent } from "@testing-library/react-native";
import { DateFormat, Theme, Units, testIDs } from "../GlobalConstants";
import { setup_custom_store } from "../Store";
import { act } from "react-test-renderer";
import { get_all_response, test_response } from "../mocks/handlers";
import { Provider } from "react-redux";
import { App_Without_Store } from "../App";

describe("settings page" , () => {
    const load_time = 50;

    const make_custom_app = (initial_state : any = {}) => {
        const custom_store = setup_custom_store(initial_state);
        return {
            store: custom_store,
            app: render(
                <Provider store={custom_store}>
                    {App_Without_Store()}
                </Provider>
            )
        }
    }

    it("setup custom store", async() => {
        const initial_state = {
            preferences : {
                date: DateFormat.dmy,
                theme: Theme.Light,
                units: Units.km
            }
        }
        const { app, store } = make_custom_app(initial_state);

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
        const { app, store } = make_custom_app(initial_state);

        expect(store.getState().preferences.theme).toEqual(
            initial_state.preferences.theme
        );
        
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
        const { app, store } = make_custom_app(initial_state);

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
        const { app, store } = make_custom_app(initial_state);

        const km_button = app.getByTestId(testIDs.units_select_km);
        const mi_button = app.getByTestId(testIDs.units_select_mi);

        fireEvent.press(km_button);
        expect(store.getState().preferences.units).toBe(Units.km);

        fireEvent.press(mi_button);
        expect(store.getState().preferences.units).toBe(Units.mi);
    })

    it("test api call", async () => {
        const { app, store } = make_custom_app();

        const result = await app.findAllByText(test_response);
        expect(result.length).toEqual(1);
    })

    it("should get all data", async () => {
        const { app, store } = make_custom_app();

        await act( async () => {
            const get_all = await app.findByTestId(testIDs.get_all);
            fireEvent.press(get_all);
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const result = await app.findAllByText(JSON.stringify(get_all_response));
        expect(result.length).toEqual(1);
    })

    it("should save data in store correctly", async () => {
        const { app, store } = make_custom_app();

        await act( async () => {
            const get_all = await app.findByTestId(testIDs.get_all);
            fireEvent.press(get_all);
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const data = store.getState().server_data;
        expect(data.key).toEqual(get_all_response.key);
        expect(data.activity).toEqual(get_all_response.activity);
        expect(data.events).toEqual(get_all_response.events);
        expect(data.need_update).toEqual(get_all_response.need_update);
    })
})
