import { Pressable, Text, View } from "react-native";
import { StoreState, actions, queries} from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { DateFormat, testIDs, texts } from "../GlobalConstants";
import React from "react";

export default function PageSettings() {
    const app_state = useSelector( (state : StoreState) => state.app_state);
    // const curr_theme = useSelector( (state : StoreState) => state.preferences.theme);

    const dispatch = useDispatch();
    const use_light_theme = () => dispatch(actions.preferences.use_light_theme())
    const use_dark_theme = () => dispatch(actions.preferences.use_dark_theme());
    const use_dmy = () => dispatch(actions.preferences.use_dmy());
    const use_mdy = () => dispatch(actions.preferences.use_mdy());
    const use_ymd = () => dispatch(actions.preferences.use_ymd());
    const use_km = () => dispatch(actions.preferences.use_km());
    const use_mi = () => dispatch(actions.preferences.use_mi());
    const logout = () => dispatch(actions.app_state.logout());

    const {data, isFetching, isError, isSuccess } = queries.useGetTestQuery();
    const [trigger, result, last_promise] = queries.useLazyGetAllQuery();

    return(
        <View>
            <Pressable testID={testIDs.theme_select_dark} onPress={use_dark_theme}>
                <Text>{texts.theme_dark}</Text>
            </Pressable>
            <Pressable testID={testIDs.theme_select_light} onPress={use_light_theme}>
                <Text>{texts.theme_light}</Text>
            </Pressable>

            <Pressable testID={testIDs.date_select_dmy} onPress={use_dmy}>
                <Text>{texts.date_dmy}</Text>
            </Pressable>
            <Pressable testID={testIDs.date_select_mdy} onPress={use_mdy}>
                <Text>{texts.date_mdy}</Text>
            </Pressable>
            <Pressable testID={testIDs.date_select_ymd} onPress={use_ymd}>
                <Text>{texts.date_ymd}</Text>
            </Pressable>

            <Pressable testID={testIDs.units_select_km} onPress={use_km}>
                <Text>{texts.units_km}</Text>
            </Pressable>
            <Pressable testID={testIDs.units_select_mi} onPress={use_mi}>
                <Text>{texts.units_mi}</Text>
            </Pressable>

            <Text testID={testIDs.test_text}>{data}</Text>

            <Pressable testID={testIDs.get_all} onPress={() => trigger({
                key: app_state.key,
                latitude: app_state.coordinates.latitude,
                longitude: app_state.coordinates.longitude
            })}>
                <Text>{JSON.stringify(result.data)}</Text>
            </Pressable>
        </View>
    )
}