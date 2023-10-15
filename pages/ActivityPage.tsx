import { Pressable, Text, View } from "react-native";
import { page_names, testIDs } from "../GlobalConstants";
import { useSelector } from "react-redux";
import { StoreState, actions, queries } from "../Store";
import { useDispatch } from "react-redux";
import React from "react";
import { Button_Activity } from "../components/QuestButton";
import { useNavigation } from "@react-navigation/native";

export default function ActivityPage() {
    const navigation = useNavigation<any>();
    const open_events = () => navigation.navigate(page_names.events);
    const open_sights = () => navigation.navigate(page_names.sights);
    const open_activity = () => navigation.navigate(page_names.activity);
    const open_settings = () => navigation.navigate(page_names.settings);
    
    const dispatch = useDispatch();

    const app_state = useSelector( (state : StoreState) => state.app_state);
    const data_state = useSelector( (state : StoreState) => state.server_data);
    const preferences = useSelector( (state : StoreState) => state.preferences);

    const set_server_data = (data : Response_All) => dispatch(
        actions.server_data.set_all(data)
    )

    const {data, isFetching, isError, isSuccess } = queries.useGetTestQuery();
    const [trigger, all_data, last_promise] = queries.useLazyGetAllQuery();

    React.useEffect( () => {
        if (all_data.isSuccess) {
            const data = JSON.parse(JSON.stringify(all_data.data)) as Response_All;
            set_server_data(data)
        }
    }, [all_data] )

    return (
        <>
            <View>
                <Pressable testID={testIDs.open_events} onPress={open_events}/>
                <Pressable testID={testIDs.open_sights} onPress={open_sights}/>
                <Pressable testID={testIDs.open_activity} onPress={open_activity}/>
                <Pressable testID={testIDs.open_settings} onPress={open_settings}/>
            </View>
            
            <Text testID={testIDs.test_text}>{data}</Text>

            <Pressable testID={testIDs.get_all} onPress={() => trigger({
                key: app_state.key,
                latitude: app_state.coordinates.latitude,
                longitude: app_state.coordinates.longitude
            })}>
                <Text>{JSON.stringify(all_data.data)}</Text>
            </Pressable>

            {data_state.activity.map( 
                (activity) => Button_Activity(activity,preferences)
            )}
        </>
    )
}