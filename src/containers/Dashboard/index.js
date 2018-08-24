import { Component } from 'inferno'
import './style.css'
import { withRouter } from 'inferno-router';
import Startups from '../../components/Startups';

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
                <div className='menu-profile'>
                    <div className='profile-photo'></div>
                    <div className='profile-name'>
                        <div className='name'>Вася</div>
                        <div className='name'>Пупкин</div>
                    </div>
                </div>
                <div className={this.state.active === 'startup' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('startup')}>
                    <i className="material-icons">apps</i>
                    <span className='item-name'>Стартапы</span></div>
                <div className={this.state.active === 'invest' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('invest')}>
                    <i className='material-icons'>show_chart</i>
                    <span className='item-name'>Инвестиции</span></div>
                <div className={this.state.active === 'favorite' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('favorite')}>
                    <i className='material-icons'>star</i>
                    <span className='item-name'>Избранное</span></div>
                <div className={this.state.active === 'settings' ? 'menu-item active' : 'menu-item'}
                    onClick={() => this.selectMenu('settings')}>
                    <i className='material-icons'>settings</i>
                    <span className='item-name'>Настройки</span></div>
                <div className='menu-item bottom'
                    onClick={this.logout}>
                    <i className='material-icons'>exit_to_app</i>
                    <span className='item-name'>Выход</span></div>
            </div>
            <div className='content'>
                {this.state.active === 'startup' && <Startups />}
                {this.state.active === 'invest' && <div>invest</div>}
                {this.state.active === 'favorite' && <Startups favorite />}
            </div>
        </div>
    }
})

export default Dashboard