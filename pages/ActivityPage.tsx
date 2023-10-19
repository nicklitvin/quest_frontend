import { Pressable, Text, View } from "react-native";
import { page_names, testIDs } from "../GlobalConstants";
import { useSelector } from "react-redux";
import { StoreState } from "../Store";
import React from "react";
import { Button_Activity } from "../components/QuestButton";
import { useNavigation } from "@react-navigation/native";

export default function ActivityPage() {
    const navigation = useNavigation<any>();
    const open_events = () => navigation.navigate(page_names.events);
    const open_sights = () => navigation.navigate(page_names.sights);
    const open_activity = () => navigation.navigate(page_names.activity);
    const open_settings = () => navigation.navigate(page_names.settings);
    
    const activities = useSelector( (state : StoreState) => state.server_data.activity);
    const preferences = useSelector( (state : StoreState) => state.preferences);

    return (
        <>
            <View>
                <Pressable testID={testIDs.open_events} onPress={open_events}/>
                <Pressable testID={testIDs.open_sights} onPress={open_sights}/>
                <Pressable testID={testIDs.open_activity} onPress={open_activity}/>
                <Pressable testID={testIDs.open_settings} onPress={open_settings}/>
            </View>

            {activities.map( 
                (activity) => Button_Activity(activity,preferences)
            )}
        </>
    )
}