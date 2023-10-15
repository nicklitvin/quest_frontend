import { useDispatch } from "react-redux";
import { actions } from "../Store";
import { Pressable, Text, View } from "react-native";
import { page_names, testIDs, texts } from "../GlobalConstants";
import { useNavigation } from "@react-navigation/native";

export default function SettingsPage() {
    const navigation = useNavigation<any>();
    const open_events = () => navigation.navigate(page_names.events);
    const open_sights = () => navigation.navigate(page_names.sights);
    const open_activity = () => navigation.navigate(page_names.activity);
    const open_settings = () => navigation.navigate(page_names.settings);
    
    const dispatch = useDispatch();
    const use_light_theme = () => dispatch(actions.preferences.use_light_theme())
    const use_dark_theme = () => dispatch(actions.preferences.use_dark_theme());
    const use_dmy = () => dispatch(actions.preferences.use_dmy());
    const use_mdy = () => dispatch(actions.preferences.use_mdy());
    const use_ymd = () => dispatch(actions.preferences.use_ymd());
    const use_km = () => dispatch(actions.preferences.use_km());
    const use_mi = () => dispatch(actions.preferences.use_mi());

    return (
        <>
            <View>
                <Pressable testID={testIDs.open_events} onPress={open_events}/>
                <Pressable testID={testIDs.open_sights} onPress={open_sights}/>
                <Pressable testID={testIDs.open_activity} onPress={open_activity}/>
                <Pressable testID={testIDs.open_settings} onPress={open_settings}/>
            </View>
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
        </>
    )
}