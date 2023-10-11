import { Pressable, Text, View } from "react-native";
import { StoreState, actions } from "../Store";
import { useDispatch, useSelector } from "react-redux";
import { testIDs, texts } from "../GlobalConstants";

export default function PageSettings() {
    const dispatch = useDispatch();
    const curr_theme = useSelector( (state : StoreState) => state.preferences.theme);

    const use_light_theme = () => dispatch(actions.preferences.use_light_theme())
    const use_dark_theme = () => dispatch(actions.preferences.use_dark_theme());

    return(
        <View>
            <Text testID={testIDs.theme_text}>{curr_theme}</Text>
            <Pressable testID={testIDs.theme_select_dark} onPress={use_dark_theme}>
                <Text>{texts.theme_dark}</Text>
            </Pressable>
            <Pressable testID={testIDs.theme_select_light} onPress={use_light_theme}>
                <Text>{texts.theme_light}</Text>
            </Pressable>
        </View>
    )
}