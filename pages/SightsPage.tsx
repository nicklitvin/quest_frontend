import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { constants, make_post_request, page_names, testIDs, urls } from "../GlobalConstants";
import { useSelector } from "react-redux";
import { StoreState, actions } from "../Store";
import { useDispatch } from "react-redux";
import { Button_Sight } from "../components/QuestButton";
import React from "react";

export default function SightsPage() {
    const navigation = useNavigation<any>();
    const open_events = () => navigation.navigate(page_names.events);
    const open_sights = () => navigation.navigate(page_names.sights);
    const open_activity = () => navigation.navigate(page_names.activity);
    const open_settings = () => navigation.navigate(page_names.settings);

    const app_state = useSelector( (state : StoreState) => state.app_state);
    const sights = useSelector( (state : StoreState) => state.server_data.sights);
    const preferences = useSelector( (state : StoreState) => state.preferences);
    const dispatch = useDispatch();

    const claim_sight = async (place_id : string, title : string) => {
        const my_claim : Claim = {
            id: place_id,
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
                const activity : Quest_Activity = {
                    date: String(new Date().toLocaleString()),
                    distance: 0,
                    place_id: place_id,
                    title: title
                }
                dispatch(actions.server_data.delete_sight(place_id));
                dispatch(actions.server_data.add_activity(activity));
            } else {
                dispatch(actions.app_state.logout())
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View>
            <Pressable testID={testIDs.open_events} onPress={open_events}/>
            <Pressable testID={testIDs.open_sights} onPress={open_sights}/>
            <Pressable testID={testIDs.open_activity} onPress={open_activity}/>
            <Pressable testID={testIDs.open_settings} onPress={open_settings}/>

            {sights.map( (sight : Quest_Sight) => 
                Button_Sight(sight, preferences, () => claim_sight(sight.place_id, sight.title)) 
            )}
        </View>
    )
}