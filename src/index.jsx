import { render } from 'inferno';
import { BrowserRouter } from 'inferno-router';
import { Provider } from 'inferno-mobx';
import MessageList from './models/MessageList';
import AppRouter from './modules/app-router/AppRouter';

if (process.env.NODE_ENV !== 'production') {
    require('inferno-devtools');
    require('mobx-logger').enableLogging({
        action: true,
        reaction: false,
        transaction: true,
        compute: false,
    });
}

const messageList = new MessageList();
messageList.addMessage('Hello World!', 'error');

function renderApp() {
    render(
        <Provider messageList={messageList}>
            <AppRouter />
        </Provider>,
        document.getElementById('root')
    );
}

renderApp();

if (module.hot) {
    module.hot.accept(renderApp);
}
