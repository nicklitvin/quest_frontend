import { StatusBar } from 'expo-status-bar';
import PageSettings from './pages/PageSettings';
import { Provider } from 'react-redux';
import { data_store } from './Store';
import { SafeAreaView } from 'react-native';

export default function App() {
    return (
        <Provider store={data_store}>
            <PageSettings/>
        </Provider>
    )
}
