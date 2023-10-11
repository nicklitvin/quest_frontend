import { Pressable, Text, View } from "react-native";
import { StoreState, actions } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { DateFormat, testIDs, texts } from "../GlobalConstants";

export default function PageSettings() {
    const curr_theme = useSelector( (state : StoreState) => state.preferences.theme);

    const dispatch = useDispatch();
    const use_light_theme = () => dispatch(actions.preferences.use_light_theme())
    const use_dark_theme = () => dispatch(actions.preferences.use_dark_theme());
    const use_dmy = () => dispatch(actions.preferences.use_dmy());
    const use_mdy = () => dispatch(actions.preferences.use_mdy());
    const use_ymd = () => dispatch(actions.preferences.use_ymd());
    

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
        </View>
    )
}