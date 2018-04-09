import { Route, IndexRoute, BrowserRouter } from 'inferno-router';
import ObserverMessageList from '../message-list/ObserverMessageList';

const AppRouter = () => (
    <BrowserRouter>
        <Route path="/" component={ObserverMessageList} />
    </BrowserRouter>
);

export default AppRouter;
