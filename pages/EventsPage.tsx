import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { constants, make_post_request, make_quest_activity, page_names, testIDs, urls } from "../GlobalConstants";
import { useSelector } from "react-redux";
import { StoreState, actions } from "../Store";
import { Button_Event } from "../components/QuestButton";
import { useDispatch } from "react-redux";

export default function EventsPage() {
    const navigation = useNavigation<any>();
    const open_events = () => navigation.navigate(page_names.events);
    const open_sights = () => navigation.navigate(page_names.sights);
    const open_activity = () => navigation.navigate(page_names.activity);
    const open_settings = () => navigation.navigate(page_names.settings);

    const dispatch = useDispatch();
    const app_state = useSelector( (state : StoreState) => state.app_state);
    const preferences = useSelector( (state : StoreState) => state.preferences);
    const events = useSelector( (state : StoreState) => state.server_data.events);

    const claim_event = async (place_id : string, event_id : string, title : string) => {
        const my_claim : Claim = {
            id: event_id,
            key: app_state.key,
            latitude: app_state.coordinates.latitude,
            longitude: app_state.coordinates.longitude,
            version: constants.version
        }
        const url = urls.base + urls.claim;
        
        try {
            const response = await make_post_request(url,my_claim) as Response_Claim;
            if (response.need_update) {
                return dispatch(actions.app_state.show_tutorial())
            }
            if (response.valid) {
                const activity = make_quest_activity(title, 0, place_id);
                dispatch(actions.server_data.delete_event(event_id));
                dispatch(actions.server_data.add_activity(activity));
            } else {
                dispatch(actions.app_state.logout())
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            <View>
                <Pressable testID={testIDs.open_events} onPress={open_events}/>
                <Pressable testID={testIDs.open_sights} onPress={open_sights}/>
                <Pressable testID={testIDs.open_activity} onPress={open_activity}/>
                <Pressable testID={testIDs.open_settings} onPress={open_settings}/>
            </View>

            {events.map( (x) => Button_Event(
                x,preferences,() => claim_event(x.place_id, x.event_id, x.title)
            ))}
        </>
        
    )
}