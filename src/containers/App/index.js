import { Component } from 'inferno'
import Login from '../../components/Login';
import { HashRouter, Route, Redirect, Switch } from 'inferno-router'
import Dashboard from '../Dashboard';


export default class App extends Component {
    state = { redirect: false }
    render() {
        return <HashRouter>
            <Switch>
                <Redirect exact from='/' to='/login'></Redirect>
                <Route exact path='/login' component={Login}></Route>
                <Route exact path='/dashboard' component={Dashboard}></Route>
            </Switch>
        </HashRouter >
    }
}