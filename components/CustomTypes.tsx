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