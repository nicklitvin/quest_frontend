import { combineReducers, configureStore, createSlice } from "@reduxjs/toolkit";

export type Theme = "Dark" | "Light";
export type AppPreferences = {
    theme : Theme
}
export type ServerData = {
    id: string
}

const initial_preferences : AppPreferences = {
    theme: "Dark"
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
            state.theme = "Light"
        },
        use_dark_theme(state) {
            state.theme = "Dark"
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

// export const actions = preferences.actions;

// export const data_store = configureStore({
//     reducer: {
//         preferences: preferences.reducer
//     }
// })

export type StoreState = ReturnType<typeof data_store.getState>



