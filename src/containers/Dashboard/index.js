import { Component } from 'inferno'
import './style.css'
import { withRouter } from 'inferno-router';

const Dashboard = withRouter(class Dashboard extends Component {
    constructor(props) {
        super(props)
        if (localStorage.getItem('user') !== 'true') {
            this.props.history.push('/')
        }
    }
    state = {
        active: 'startup'
    }

    selectMenu = (menu) => {
        this.setState({ active: menu })
    }
    logout = () => {
        localStorage.removeItem('user')
        this.props.history.push('/')
    }
    render() {
        return <div className='dashboard'>
            <div className='menu'>
                <div className={this.state.active === 'startup' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('startup')}>Стартапы</div>
                <div className={this.state.active === 'favorite' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('favorite')}>Избранное</div>
                <div className={this.state.active === 'settings' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('settings')}>Настройки</div>
                <div className='menu-item bottom'
                    onClick={this.logout}>
                    <i className='material-icons'>exit_to_app</i>Выход</div>
            </div>
    </div>
    }
})

export default Dashboard