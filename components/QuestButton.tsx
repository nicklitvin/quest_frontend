import { constants, texts } from "../GlobalConstants";
import { Linking, Pressable, Text, View } from "react-native";
import { AppPreferences, DateFormat, Units } from "./CustomTypes";

export const extract_time = (date : string) => {
    const date_object = new Date(date);

    const local_date = date_object.toLocaleDateString(
        undefined, {
        day:"2-digit",month:"2-digit",year:"numeric",
        hour: "numeric", minute: "numeric",hourCycle:"h24"
    });

    const parts = local_date.split(", ");
    const datePart = parts[0];
    const timePart = parts[1].replace(" ", "").toLowerCase();

    const [monthStr, dayStr, yearStr] = datePart.split("/");
    const month = String(parseInt(monthStr, 10)).padStart(2, '0'); 
    const day = String(parseInt(dayStr, 10)).padStart(2, '0');     
    const year = parseInt(yearStr, 10);  
    
    const time_parts = timePart.split(":");
    const hours_24 = Number(time_parts[0]);
    let hours, time_type;

    if (hours_24 < 12) {
        hours = hours_24;
        time_type = "am";
    } else {
        hours = hours_24 - 12;
        time_type = "pm";
    }

    const minutes = time_parts[1].slice(0,3);

    return {
        day: String(day),
        month: String(month),
        year: String(year),
        hour: String(hours),
        minute: String(minutes),
        time_type: time_type
    }
}

export const make_claim_text = (date : string, format: DateFormat) => {
    const time = extract_time(date);

    switch (format) {
        case (DateFormat.dmy):
            return `Claimed on ${time.day}/${time.month}/${time.year}`;
        case (DateFormat.mdy):
            return `Claimed on ${time.month}/${time.day}/${time.year}`;
        default:
            return `Claimed on ${time.year}/${time.month}/${time.day}`;
    }
}

export const make_event_date_text = (start_time : string, end_time : string, format : DateFormat) => {
    const start = extract_time(start_time);
    const end = extract_time(end_time);

    let start_text, end_text;

    switch (format) {
        case (DateFormat.dmy):
            start_text = `${start.day}/${start.month}`;
            end_text = `${end.day}/${end.month}`;
            break;
        default:
            start_text = `${start.month}/${start.day}`;
            end_text = `${end.month}/${end.day}`;
            break;
    }

    return `${start_text} ${start.hour}:${start.minute}${start.time_type} - ${end_text} ${end.hour}:${end.minute}${end.time_type}`;
}

export const convert_distance = (meters : number, units : Units) => {
    return units == Units.km ? 
        meters * constants.meter_to_km : 
        meters * constants.meter_to_mi
}

export const make_distance_text = (distance : number, zero_allowed : boolean, units: Units) => {
    let val = Number(distance.toFixed(1));

    if (val == 0 && !zero_allowed) val = 0.1;

    if (units == Units.km) {
        return `${val}km.`
    } else {
        return `${val}mi.`
    }
}

export const open_map_url = (place_id : string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place_id}&query_place_id=${place_id}`;
    Linking.openURL(url);
}

export const is_time_claimable = (start: string, end: string) : boolean => {
    const curr_time = new Date()
    const start_time = new Date(start);
    const end_time = new Date(end);

    return curr_time > start_time && curr_time < end_time;
}

const is_valid_web_link = (url : string) => {
    if (
        (url.length > 6 && url.slice(0,7) == "http://") ||
        (url.length > 7 && url.slice(0,8) == "https://")
    ) return true;
    return false;
}

export const open_event_url = (event_url : string | null, id : string) => {
    if (event_url && is_valid_web_link(event_url)) {
        Linking.openURL(event_url);
    } else {
        open_map_url(id);
    }
}

export function Button_Activity(data : Quest_Activity, preferences : AppPreferences) {
    return (
        <Pressable key={data.date} onPress={() => open_map_url(data.place_id)}>
            <View>
                <Text>{data.title}</Text>
                <Text>{make_distance_text(data.distance,true,preferences.units)}</Text>
                <Text>{make_claim_text(data.date, preferences.date)}</Text>
            </View>
        </Pressable>
    )
}

export function Button_Sight(data : Quest_Sight, preferences: AppPreferences, claim : Function) {
    if (data.distance == 0) {
        return (
            <Pressable key={data.title} onPress={() => claim()}>
                <View>
                    <Text>{data.title}</Text>
                    <Text>{texts.claim_text}</Text>
                </View>
            </Pressable>
        )
    } else {
        return (
            <Pressable key={data.title} onPress={() => open_map_url(data.place_id)}>
                <View>
                    <Text>{data.title}</Text>
                    <Text>{make_distance_text(data.distance,false,preferences.units)}</Text>
                </View>
            </Pressable>
        )
    }
}

export function Button_Event(data : Quest_Event, preferences: AppPreferences, claim : Function) {
    if (data.distance == 0 && is_time_claimable(data.start_time, data.end_time)) {
        return (
            <Pressable key={data.title} onPress={() => claim()}>
                <View>
                    <Text>{data.title}</Text>
                    <Text>{texts.claim_text}</Text>
                </View>
            </Pressable>
        )
    } else {
        return (
            <Pressable key={data.title} onPress={() => open_event_url(data.web_link, data.place_id)}>
                <View>
                    <Text>{data.title}</Text>
                    <Text>{make_distance_text(data.distance,false,preferences.units)}</Text>
                    <Text>{make_event_date_text(data.start_time,data.end_time,preferences.date)}</Text>
                </View>
            </Pressable>
        )
    }
}