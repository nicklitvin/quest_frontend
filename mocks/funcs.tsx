import { act } from "react-test-renderer";
import { setup_custom_store } from "../Store";
import { render } from "@testing-library/react-native";
import { Provider } from "react-redux";
import { App_Without_Store } from "../App";

const load_time = 50;

export const snooze = async () => {
    await act( async () => {
        await new Promise( (res) => setTimeout(res,load_time) );
    })
}

export const make_custom_app = async (initial_state : any = {}) => {
    const store = setup_custom_store(initial_state);
    const app = render(
        <Provider store={store}>
            {App_Without_Store()}
        </Provider>
    );
    await snooze();
    return {store, app}
}