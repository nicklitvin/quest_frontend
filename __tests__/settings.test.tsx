import App from "../App";
import { render, fireEvent } from "@testing-library/react-native";
import { DateFormat, Theme, Units, testIDs, texts, urls } from "../GlobalConstants";
import { data_store } from "../Store";
import { act } from "react-test-renderer";
import { get_all_response, test_response } from "../mocks/handlers";

describe("settings page" , () => {
    const load_time = 50;

    it("should change theme", async () => {
        const app = render(<App/>)
        await act( async () => {
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const light_button = app.getByTestId(testIDs.theme_select_light);
        const dark_button = app.getByTestId(testIDs.theme_select_dark);

        fireEvent.press(light_button);
        expect(data_store.getState().preferences.theme).toEqual(Theme.Light);

        fireEvent.press(dark_button);
        expect(data_store.getState().preferences.theme).toEqual(Theme.Dark);
    })

    it("should change date", async () => {
        const app = render(<App/>)
        await act( async () => {
            await new Promise( (res) => setTimeout(res,load_time) );
        })

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
        await act( async () => {
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const km_button = app.getByTestId(testIDs.units_select_km);
        const mi_button = app.getByTestId(testIDs.units_select_mi);

        fireEvent.press(km_button);
        expect(data_store.getState().preferences.units).toBe(Units.km);

        fireEvent.press(mi_button);
        expect(data_store.getState().preferences.units).toBe(Units.mi);
    })

    it("test api call", async () => {
        const app = render(<App/>);
        await act( async () => {
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const result = await app.findAllByText(test_response);
        expect(result.length).toEqual(1);
    })

    it("should get all data", async () => {
        const app = render(<App/>);
        await act( async () => {
            await new Promise( (res) => setTimeout(res,load_time) );
            const get_all = await app.findByTestId(testIDs.get_all);
            fireEvent.press(get_all);
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const result = await app.findAllByText(JSON.stringify(get_all_response));
        expect(result.length).toEqual(1);
    })
})
