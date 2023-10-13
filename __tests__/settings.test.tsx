import App from "../App";
import { render, fireEvent } from "@testing-library/react-native";
import { DateFormat, Theme, Units, testIDs } from "../GlobalConstants";
import { data_store } from "../Store";
import { act } from "react-test-renderer";
import { get_all_response, test_response } from "../mocks/handlers";

describe("settings page" , () => {
    const load_time = 50;

    let app : ReturnType<typeof render>;

    beforeEach( async () => {
        app = render(<App/>);

        await act( async () => {
            await new Promise( (res) => setTimeout(res,load_time) );
        })
    })

    it("should change theme", async () => {
        const light_button = app.getByTestId(testIDs.theme_select_light);
        const dark_button = app.getByTestId(testIDs.theme_select_dark);

        fireEvent.press(light_button);
        expect(data_store.getState().preferences.theme).toEqual(Theme.Light);

        fireEvent.press(dark_button);
        expect(data_store.getState().preferences.theme).toEqual(Theme.Dark);
    })

    it("should change date", async () => {
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
        const km_button = app.getByTestId(testIDs.units_select_km);
        const mi_button = app.getByTestId(testIDs.units_select_mi);

        fireEvent.press(km_button);
        expect(data_store.getState().preferences.units).toBe(Units.km);

        fireEvent.press(mi_button);
        expect(data_store.getState().preferences.units).toBe(Units.mi);
    })

    it("test api call", async () => {
        const result = await app.findAllByText(test_response);
        expect(result.length).toEqual(1);
    })

    it("should get all data", async () => {
        await act( async () => {
            const get_all = await app.findByTestId(testIDs.get_all);
            fireEvent.press(get_all);
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const result = await app.findAllByText(JSON.stringify(get_all_response));
        expect(result.length).toEqual(1);
    })

    it("should save data in store correctly", async () => {
        await act( async () => {
            const get_all = await app.findByTestId(testIDs.get_all);
            fireEvent.press(get_all);
            await new Promise( (res) => setTimeout(res,load_time) );
        })

        const data = data_store.getState().server_data;
        expect(data.key).toEqual(get_all_response.key);
        expect(data.activity).toEqual(get_all_response.activity);
        expect(data.events).toEqual(get_all_response.events);
        expect(data.need_update).toEqual(get_all_response.need_update);
    })

    it("should show activity", async() => {
        // const pre_data = await app.findAllByText(get_all_response.activity[0].title);
        // console.log(pre_data.map( (x) => x.props))
        // expect(pre_data.length).toEqual(0);  

        // await act( async () => {
        //     const get_all = await app.findByTestId(testIDs.get_all);
        //     fireEvent.press(get_all);
        //     await new Promise( (res) => setTimeout(res,load_time) );
        // })

        // const post_data = await app.findAllByText(get_all_response.activity[0].title);
        // expect(post_data.length).toEqual(2);
    })
})
