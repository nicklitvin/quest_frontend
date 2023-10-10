import { Pressable, Text, View } from "react-native";
import { StoreState, Theme, actions } from "../Store";
import { useDispatch, useSelector } from "react-redux";
export default function PageSettings() {
    const dispatch = useDispatch();
    const curr_theme = useSelector( (state : StoreState) => state.preferences.theme);

    const store_change_theme = (theme : Theme) => {
        if (theme == "Dark") dispatch(actions.preferences.use_dark_theme());
        else dispatch(actions.preferences.use_light_theme())
    };

    return(
        <View>
            <Text>{curr_theme}</Text>
            <Pressable onPress={() => store_change_theme("Dark")}>
                <Text>Dark</Text>
            </Pressable>
            <Pressable onPress={() => store_change_theme("Light")}>
                <Text>Light</Text>
            </Pressable>
        </View>
    )
}