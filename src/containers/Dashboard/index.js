import { Component } from 'inferno'
import './style.css'
import { withRouter } from 'inferno-router';
import Startups from '../../components/Startups';
import { observer, inject } from 'inferno-mobx';
import Profile from '../../components/Profile';
import Invest from '../../components/Invest';

const Dashboard = inject(['store'])(observer(withRouter(class Dashboard extends Component {
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
    componentDidMount() {
        this.props.store.user.loadData()
        this.props.store.loadStartups()
    }
    render() {
        let { store } = this.props
        return <div className='dashboard'>
            <div className='menu'>
                <div className='menu-profile'>
                    <div className='profile-photo' style={{ backgroundImage: `url(${store.user.photo})` }}></div>
                    <div className='profile-name'>
                        <div className='name'>{store.user.firstName}</div>
                        <div className='name'>{store.user.lastName}</div>
                    </div>
                </div>
                <div id='startups' className={this.state.active === 'startup' ? 'menu-item active' : 'menu-item'}
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
                {this.state.active === 'invest' && <Invest />}
                {this.state.active === 'favorite' && <Startups favorite />}
                {this.state.active === 'settings' && <Profile user={store.user} />}
            </div>
        </div>
    }
})))

export default Dashboard