import PageSettings from './pages/PageSettings';
import { Provider } from 'react-redux';
import { default_store } from './Store';

export default function App() {
    return (
        <Provider store={default_store}>
            <PageSettings/>
        </Provider>
    )
}

export function App_Without_Store() {
    return (
        <PageSettings/>
    )
}
