import { PreloadedState, combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { AppPreferences, AppState, Coordinates, DateFormat, Theme, Units } from "./components/CustomTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { urls } from "./GlobalConstants";

const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: urls.base}),
    endpoints: builder => ({
        getTest: builder.query<any,void>({
            query: () => ({url: urls.test, method: "GET"})
        }),
        getAll: builder.query<JSON,Request_All>({
            query: (arg) => ({url: urls.get_all, method: "POST", body: JSON.stringify(arg)})
        })
    }),
    keepUnusedDataFor: 0
})
export const queries = api;

const initial_preferences : AppPreferences = {
    theme: Theme.Dark,
    date: DateFormat.mdy,
    units: Units.mi
}
const initial_app_state : AppState = {
    view_tutorial: true,
    logged_in: false,
    show_update: false,
    coordinates: {latitude: 0, longitude: 0},
    key: ""
}
const initial_server_data : Response_All = {
    key: "",
    activity: [],
    events: [],
    sights: [],
    need_update: false
}

const app_state = createSlice({
    name: "server_data",
    initialState: initial_app_state,
    reducers: {
        show_tutorial(state) { state.view_tutorial = true },
        hide_tutorial(state) { state.view_tutorial = false },
        logout(state) { state.logged_in = false },
    }
})
const preferences = createSlice({
    name: "preferences",
    initialState: initial_preferences,
    reducers: {
        use_light_theme(state) { state.theme = Theme.Light },
        use_dark_theme(state) { state.theme = Theme.Dark },
        use_dmy(state) { state.date = DateFormat.dmy },
        use_mdy(state) { state.date = DateFormat.mdy },
        use_ymd(state) { state.date = DateFormat.ymd },
        use_mi(state) { state.units = Units.mi },
        use_km(state) { state.units = Units.km }
    }
})
const server_data = createSlice({
    name: "server_data",
    initialState: initial_server_data,
    reducers: {
        add_activity(state, action : {type : string, payload : Quest_Activity}) {
            state.activity.unshift(action.payload);
        },
        delete_sight(state, action : {type: string, payload: string}) {
            state.sights = state.sights.filter((sight) => sight.id !== action.payload)
        }
    }
})

export interface InitialState {
    preferences?: AppPreferences,
    app_state?: AppState,
    server_data?: Response_All,
}

const rootReducer = combineReducers({
    preferences: preferences.reducer,
    app_state: app_state.reducer,
    server_data: server_data.reducer,
    [api.reducerPath]: api.reducer
})

export const default_store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware : any) => 
        getDefaultMiddleware().concat(api.middleware)
})

export const actions = {
    preferences: preferences.actions,
    app_state: app_state.actions,
    server_data: server_data.actions
}

export type StoreState = ReturnType<typeof default_store.getState>

export const setup_custom_store = (
    preloadedState: PreloadedState<typeof rootReducer>
) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState,
        middleware: (getDefaultMiddleware : any) => 
            getDefaultMiddleware().concat(api.middleware)
    })
}
