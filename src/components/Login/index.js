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
                showError: true
            })
        }
    }
    render() {
        return <div className='login'>
        <div className='logo'></div>
            <div className='input-container'>
                <div> Добро пожаловать в <span className='service-name'>Tinkoff.CashInvest</span></div>
                <div className="input-field">
                    <label>Логин</label>
                    <input type="text" className='input' value={this.state.login} onInput={this.loginHandler}></input>
                </div>
                <div className="input-field">
                    <label>Пароль</label>
                    <input type="password" className='input' value={this.state.password}
                        onInput={this.passwordHandler}
                        onKeyDown={e => { if (e.key === 'Enter') { this.checkLogin(e) } }}></input>
                </div>
                <button className='input-button' onClick={this.checkLogin}>Войти</button>
                {this.state.showError && <span className='input-error'>Неверное имя пользователя или пароль</span>}
            </div>
        </div>
    }
})

export default Login
