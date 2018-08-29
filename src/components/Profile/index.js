import { Component } from 'inferno'
import './style.css'
import { observer } from 'inferno-mobx';
import CompanyModal from '../CompanyModal';

@observer
export default class user extends Component {
    state = {
        showModal: false
    }
    handleChange = e => this.props.user.setWithdraw(e.target.value)
    openModal = () => this.setState({ showModal: true })
    closeModal = () => this.setState({ showModal: false })
    toMenu = () => document.getElementById('startups').click()
    render() {
        let { user } = this.props
        let chosenCompany = user.chosenCompany
        return <div className='user'>
            <section className='user-header'>
                <div className='user-photo' style={{ backgroundImage: `url(${user.photo})` }}></div>
                <div className='user-name'>
                    <span>
                        {user.firstName}
                    </span>
                    <span>
                        {user.lastName}
                    </span>
                </div>
            </section>
            <section className='user-info'>
                <p className='section-header'>Баланс</p>
                <hr className='hr'></hr>
                <div className='money'>
                    <p className='money-caption'>На счёте</p>
                    <p className='money-balance'>{user.balance} руб.</p>
                </div>
                <div className='money'>
                    <p className='money-caption'>Кэшбэк в текущем месяце</p>
                    <p className='money-balance'>{user.cashback} руб.</p>
                </div>
            </section>
            <section className='user-options'>
                <p className='section-header'>Списание кэшбэка</p>
                <hr className='hr' />
                <div className='money'>
                    <span className='money-caption'>Кэшбэк списывается</span>
                    <select className='withdraw-select' value={user.withdrawTo} onChange={this.handleChange}>
                        <option value='card'>На карту</option>
                        <option value='company'>Компании</option>
                    </select>
                </div>
                {user.withdrawTo === 'company' && chosenCompany && <div className='money'>
                    <span className='money-caption'>Компания</span>
                    <span className='money-balance company link' onClick={this.openModal}>{chosenCompany.name}</span>
                </div>}
                {user.withdrawTo === 'company' && !chosenCompany && <p className='info-msg'>
                    <span>У вас нет текущей компании.</span>
                    <span className='span link' onClick={this.toMenu}>Выберите</span>
                    <span className='span'>компанию в главном меню, чтобы перечислять кэшбэк ей. Сейчас кэшбэк перечисляется вам на карту.</span>
                </p>}
            </section>
            {this.state.showModal && chosenCompany && <CompanyModal startup={chosenCompany} closeModal={this.closeModal} />}
        </div>
    }
}