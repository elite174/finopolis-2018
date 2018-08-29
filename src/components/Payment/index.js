import { Component } from 'inferno'
import './style.css'
import { inject, observer } from 'inferno-mobx';


@inject('store')
@observer
export default class Payment extends Component {
    state = {
        showForm: false,
        error: false,
        value: 0
    }
    show = () => this.setState({ showForm: true })
    hide = () => this.setState({ showForm: false })
    subscribe = () => {
        if (this.props.store.user.companyId === this.props.startup.id) {
            this.props.store.user.chooseCompany(-1)
        } else {
            this.props.store.user.chooseCompany(this.props.startup.id)
        }
    }
    invest = () => {
        let money = Number(this.state.value)
        if (money > this.props.store.user.balance) {
            this.setState({
                error: true,
                value: 0
            })
        } else {
            this.props.store.invest(this.props.startup.id, money)
            this.setState({ showForm: false, error: false, value: 0 })
        }
    }
    render() {
        let { store, startup } = this.props
        return <div className='payment'>
            {!this.state.showForm && <div className='payment-options'>
                <div className={startup.id === store.user.companyId ? 'pay-button a' : 'pay-button'} onClick={this.subscribe}>
                    {startup.id === store.user.companyId ? 'Отписаться' : 'Подписаться'}
                </div>
                <div className='pay-button inv' onClick={this.show}>Инвестировать</div>
            </div>}
            {this.state.showForm && <div className='payment-details'>
                <p className='pay-info'>У вас на счету {store.user.balance} руб.</p>
                <input type="number" value={this.state.value} onInput={e => this.setState({ value: e.target.value })} />
                <div className='buttons'>
                    <div className='cancel' onClick={() => this.setState({ value: 0, showForm: false, error: false })}>Отмена</div>
                    <div className='submit' onClick={this.invest}>Инвестировать</div>
                </div>
                {this.state.error && <p className='error'>У вас недостаточно средств</p>}
            </div>}
        </div>
    }
}