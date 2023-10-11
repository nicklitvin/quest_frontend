export const testIDs = {
    theme_text: "theme_text",
    theme_select_light: "theme_light",
    theme_select_dark: "theme_dark",
    date_select_dmy: "dmy",
    date_select_mdy: "mdy",
    date_select_ymd: "ymd"
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

export const texts = {
    theme_light: Theme.Light,
    theme_dark: Theme.Dark,
    date_dmy: DateFormat.dmy,
    date_mdy: DateFormat.mdy,
    date_ymd: DateFormat.ymd
}