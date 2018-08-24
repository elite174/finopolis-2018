import { Component } from 'inferno'
import Login from '../../components/Login';
import { HashRouter, Route, Redirect, Switch } from 'inferno-router'
import Dashboard from '../Dashboard';
import { Provider } from 'inferno-mobx';
import store from '../../store';


export default class App extends Component {
    render() {
        return <Provider store={store}>
            <HashRouter>
                <Switch>
                    <Redirect exact from='/' to='/login'></Redirect>
                    <Route exact path='/login' component={Login}></Route>
                    <Route exact path='/dashboard' component={Dashboard}></Route>
                </Switch>
            </HashRouter >
        </Provider>
    }
}