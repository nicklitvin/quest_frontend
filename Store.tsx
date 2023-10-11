import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";
import { DateFormat, Theme } from "./GlobalConstants";

export type AppPreferences = {
    theme : Theme,
    date: DateFormat
}
export type ServerData = {
    id: string
}

const initial_preferences : AppPreferences = {
    theme: Theme.Dark,
    date: DateFormat.mdy
}
const initial_server_data : ServerData = {
    id: "1"
}

const server_data = createSlice({
    name: "server_data",
    initialState: initial_server_data,
    reducers: {
        change(state) {
            state.id = "2"
        }
    }
})

const preferences = createSlice({
    name: "preferences",
    initialState: initial_preferences,
    reducers: {
        use_light_theme(state) {
            state.theme = Theme.Light
        },
        use_dark_theme(state) {
            state.theme = Theme.Dark
        },
        use_dmy(state) {
            state.date = DateFormat.dmy
        },
        use_mdy(state) {
            state.date = DateFormat.mdy
        },
        use_ymd(state) {
            state.date = DateFormat.ymd
        }
    }
})

const rootReducer = combineReducers({
    preferences: preferences.reducer,
    server_data: server_data.reducer
})

export const data_store = configureStore({
    reducer: rootReducer
})

export const actions = {
    preferences: preferences.actions,
    server_data: server_data.actions
}

export type StoreState = ReturnType<typeof data_store.getState>



