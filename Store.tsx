import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { Coordinates, DateFormat, Theme, Units } from "./GlobalConstants";
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

export interface AppPreferences {
    theme : Theme,
    date: DateFormat,
    units: Units
}
export interface AppState {
    view_tutorial: boolean,
    logged_in: boolean,
    show_update: boolean,
    coordinates: Coordinates,
    key: string
}

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
        set_key(state, action) { state.key = action.payload },
        set_all(state, action : {type : string, payload : Response_All}) {
            const payload = action.payload;
            state.key = payload.key;
            state.activity = payload.activity;
            state.events = payload.events;
            state.sights = payload.sights;
            state.need_update = payload.need_update;
        },
        delete_all(state) { state = initial_server_data}
    }
})

const rootReducer = combineReducers({
    preferences: preferences.reducer,
    app_state: app_state.reducer,
    server_data: server_data.reducer,
    [api.reducerPath]: api.reducer
})

export const data_store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware : any) => 
        getDefaultMiddleware().concat(api.middleware)
})

export const actions = {
    preferences: preferences.actions,
    app_state: app_state.actions,
    server_data: server_data.actions
}

export type StoreState = ReturnType<typeof data_store.getState>



