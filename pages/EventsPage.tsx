import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { page_names, testIDs } from "../GlobalConstants";
import { useSelector } from "react-redux";
import { StoreState } from "../Store";

export default function EventsPage() {
    const navigation = useNavigation<any>();
    const open_events = () => navigation.navigate(page_names.events);
    const open_sights = () => navigation.navigate(page_names.sights);
    const open_activity = () => navigation.navigate(page_names.activity);
    const open_settings = () => navigation.navigate(page_names.settings);

    const events = useSelector( (state : StoreState) => state.server_data.events);

    return (
        <>
            <View>
                <Pressable testID={testIDs.open_events} onPress={open_events}/>
                <Pressable testID={testIDs.open_sights} onPress={open_sights}/>
                <Pressable testID={testIDs.open_activity} onPress={open_activity}/>
                <Pressable testID={testIDs.open_settings} onPress={open_settings}/>
            </View>
            {/* {events.map( (quest_event) => Ques)} */}
        </>
        
    )
}