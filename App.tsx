import { Provider } from 'react-redux';
import { default_store } from './Store';
import Logged_In_Navigation from './pages/LoggedInNavigation';

export default function App() {
    return (
        <Provider store={default_store}>
            <Logged_In_Navigation/>
        </Provider>
    )
}

export function App_Without_Store() {
    return (
        <Logged_In_Navigation/>
    )
}
