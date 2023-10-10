import { Text, TouchableOpacity, View } from "react-native";
import { StoreState, Theme, actions } from "../Store";
import { useDispatch, useSelector } from "react-redux";
export default function PageSettings() {
    const dispatch = useDispatch();
    const curr_theme = useSelector( (state : StoreState) => state.preferences.theme);

    const store_change_theme = (theme : Theme) => {
        if (theme == "Dark") dispatch(actions.use_dark_theme());
        else dispatch(actions.use_light_theme())
    };

    return(
        <View>
            <Text>{curr_theme}</Text>
            <TouchableOpacity onPress={() => store_change_theme("Dark")}>
                <Text>Dark</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => store_change_theme("Light")}>
                <Text>Light</Text>
            </TouchableOpacity>
        </View>
    )
}