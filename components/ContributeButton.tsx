import { Linking, Pressable, Text, View } from "react-native";
import { AppPreferences } from "./CustomTypes";
import { texts, urls } from "../GlobalConstants";

export function ContributeButton(preferences: AppPreferences, is_sight: boolean) {
    const open_link = () => {
        const url = is_sight ? urls.contribute_sight : urls.contribute_event;
        Linking.openURL(url);
    }

    return (
        <Pressable onPress={open_link}>
            <Text>{is_sight ? texts.add_sight_title : texts.add_event_title}</Text>
            <Text>{is_sight ? texts.add_event_subtitle : texts.add_sight_subtitle}</Text>
        </Pressable>
    )
}