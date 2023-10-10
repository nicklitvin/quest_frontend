import { configureStore, createSlice } from "@reduxjs/toolkit";

export type Theme = "Dark" | "Light";
export type AppPreferences = {
    theme : Theme
}

const initial_preferences : AppPreferences = {
    theme: "Dark"
}

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

export const actions = preferences.actions;

export const data_store = configureStore({
    reducer: {
        preferences: preferences.reducer
    }
})

export type StoreState = ReturnType<typeof data_store.getState>



