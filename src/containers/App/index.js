import { Component } from 'inferno'
import Login from '../../components/Login';
import { BrowserRouter, Route, Redirect, Switch } from 'inferno-router'
import Dashboard from '../Dashboard';


export default class App extends Component {
    state = { redirect: false }
    render() {
        return <BrowserRouter>
            <Switch>
                <Redirect exact from='/' to='/login'></Redirect>
                <Route exact path='/login' component={Login}></Route>
                <Route exact path='/dashboard' component={Dashboard}></Route>
            </Switch>
        </BrowserRouter >
    }
}