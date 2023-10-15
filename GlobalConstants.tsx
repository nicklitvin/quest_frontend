export const constants = {
    version: "2.0.0",
    meter_to_km: 0.001,
    meter_to_mi: 0.000621371
}

export const page_names = {
    settings: "settings",
    events: "events",
    sights: "sights",
    activity: "activity"
}

export const urls = {
    base: "http://example.com",
    test: "/test",
    get_all: "/getAll"
}

export const testIDs = {
    theme_text: "theme_text",
    theme_select_light: "theme_light",
    theme_select_dark: "theme_dark",
    date_select_dmy: "dmy",
    date_select_mdy: "mdy",
    date_select_ymd: "ymd",
    units_select_km: "km",
    units_select_mi: "mi",
    logout: "logout",
    test_text: "test_text",
    get_all: "get_all",
    open_events: "open_events",
    open_sights: "open_sights",
    open_activity: "open_activity",
    open_settings: "open_settings"
}

export enum Theme {
    Dark = "Dark",
    Light = "Light"
}

export enum DateFormat {
    dmy = "dd/mm/yyyy",
    mdy = "mm/dd/yyyy",
    ymd = "yyyy/mm/dd"
}

export enum Units {
    km = "Kilometers (km)",
    mi = "Miles (mi)"
}

export type Coordinates = {
    latitude: number,
    longitude: number
}

export const texts = {
    theme_light: Theme.Light,
    theme_dark: Theme.Dark,
    date_dmy: DateFormat.dmy,
    date_mdy: DateFormat.mdy,
    date_ymd: DateFormat.ymd,
    units_mi: Units.mi,
    units_km: Units.km,
    get_all: "get_all",
    claim_text: "Claim Now"
}
