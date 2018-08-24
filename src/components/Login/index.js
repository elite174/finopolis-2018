import { Component } from 'inferno'
import './style.css'
import { withRouter } from 'inferno-router';

const Login = withRouter(class Login extends Component {
    constructor(props) {
        super(props)
        if (localStorage.getItem('user') === 'true') {
            this.props.history.push('/dashboard')
        }
    }
    state = {
        login: '',
        password: '',
        showError: false
    }

    loginHandler = e => this.setState({ login: e.target.value })
    passwordHandler = e => this.setState({ password: e.target.value })
    checkLogin = (e) => {
        e.preventDefault()
        if (this.state.login === 'login' && this.state.password === 'pass') {
            localStorage.setItem('user', 'true')
            this.props.history.push('/dashboard')
        } else {
            this.setState({
                login: '',
                password: '',
                showError: true
            })
        }
    }
    render() {
        return <div className='login'>
            <div className='input-container'>
                <div className="input-field">
                    <label>Login</label>
                    <input type="text" className='input' value={this.state.value} onInput={this.loginHandler}></input>
                </div>
                <div className="input-field">
                    <label>Password</label>
                    <input type="password" className='input' value={this.state.password} onInput={this.passwordHandler}></input>
                </div>
                <button className='input-button' onClick={this.checkLogin}>Login</button>
                {this.state.showError && <span className='input-error'>The login is incorrect</span>}
            </div>
        </div>
    }
})

export default Login
