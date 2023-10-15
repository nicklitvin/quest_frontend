import { page_names, testIDs } from '../GlobalConstants';
import EventsPage from './EventsPage';
import SightsPage from './SightsPage';
import ActivityPage from './ActivityPage';
import SettingsPage from './SettingsPage';
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
const Tab = createMaterialTopTabNavigator();

export default function Logged_In_Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                tabBarPosition="bottom"
            >
                <Tab.Screen 
                    name={page_names.events} 
                    component={EventsPage}
                />
                <Tab.Screen 
                    name={page_names.sights} 
                    component={SightsPage}
                />
                <Tab.Screen 
                    name={page_names.activity} 
                    component={ActivityPage}
                />
                <Tab.Screen 
                    name={page_names.settings} 
                    component={SettingsPage}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}