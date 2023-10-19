import { DateFormat, Theme, Units } from "./components/CustomTypes"

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
    get_all: "/getAll",
    claim: "/claim"
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

export const make_quest_activity =  
    (title : string, distance : number, place_id : string) : Quest_Activity => 
    {
        const activity : Quest_Activity = {
            date: new Date().toISOString(),
            distance: distance,
            place_id: place_id,
            title: title
        }
        return activity;
    }
export const make_post_request = async (url : string, content : any) => {
    const request : RequestInit = {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(content)
    }
    try {
        const response = await fetch(url, request);
        const result = await response.json();
        return result;
    } catch (err) {
        console.log(err)
    }
}
