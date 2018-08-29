import { Component, createPortal } from 'inferno'
import './style.css'
import { observer, inject } from 'inferno-mobx';
import Payment from '../Payment';


const Bonus = observer(({ startup }) => {
    return <div className='bonus'>
        <section className='section'>
            <p className='section-header'>Бонусы</p>
            <hr className='hr' />
            {startup.features.map(f => <div key={f.id} className='feature'>
                <p className='bonus-name'>{f.name}
                    <span className='span bonus-count'>{f.number} шт</span>
                </p>
                <p className='bonus-cost'>Стоимость: {f.cost} руб.</p>
                <div className='progress-bar'>
                    <div className='bar' style={{ width: `${Math.round(f.my_investment / f.cost * 100)}%` }}>
                    </div>
                </div>
                <p className='bonus-remain'>
                    <span >Мои вложения:</span>
                    <span className='span bold'>{f.my_investment} руб</span>
                    <span className='span'>/</span>
                    <span className='span bold'>{f.cost} руб.</span>
                </p>
            </div>)}
        </section>
    </div>
})

const Info = ({ startup }) => {
    return <div className='info'>
        <section className='section'>
            <p className='section-header'>Информация</p>
            <hr className='hr' />
            <p className='full-desc'>{startup.full_desc}</p>
        </section>
        <section className='section'>
            <p className='section-header'>Видео</p>
            <hr className='hr' />
            <iframe src={startup.video_link} frameBorder='none' />
        </section>
    </div>
}

const Notification = ({ companyName, bonus }) => {
    return <div className='notification'>
        <i className='material-icons icon'>star</i>
        <div className='n-text'>
            <p className='n-msg'>Поздравляем!</p>
            <p className='n-msg'>
                <span>Вы только что получили</span>
                <span className='span bold'>{bonus}</span>
                <span className='span'>от</span>
                <span className='span bold'>{companyName}</span>!
            </p>
        </div>
    </div>
}

@inject('store')
@observer
class ModalContent extends Component {
    state = {
        show: 'info'
    }

    show = show => this.setState({ show })
    render() {
        let { startup, store } = this.props
        return <div className='modal-content'>
            <div className='notification-list'>
                {store.notifications.map(n => <Notification key={n.id} companyName={n.companyName} bonus={n.bonus} />)}
            </div>
            <div className='modal-header' style={{ backgroundImage: `url(${startup.logo})` }}>
                <div className='header-wall'>
                    <p className='modal-profile'>{startup.profile}
                    </p>
                    <p className='modal-name'>
                        <span>{startup.name}</span>
                        <span className={startup.liked ? 'like-button active' : 'like-button'} onClick={startup.setLike} >
                            <i className='material-icons'>favorite</i>
                            <span className='span'>{startup.liked ? startup.like + 1 : startup.like}</span>
                        </span></p>
                </div>
            </div>
            <div className='modal-info'>
                <div className='info-left'>
                    <div className='primary-info'>
                        <div className='success'>
                            <p className='success-score'>{startup.success_score}%</p>
                            <p className='success-word'>успех</p>
                        </div>
                        <div className='completed'>
                            <p>Уже собрано
                                <span className='value'>{startup.donation_percentage.toFixed(2)}%
                                </span>
                            </p>
                            <div className='progress-bar'>
                                <div className='bar' style={{ width: `${Math.round(startup.donation_percentage)}%` }}>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='other-info'>
                        <div className='info-date'>
                            <span>Начало кампании:</span>
                            <span>{startup.start_date}</span>
                        </div>
                        <div className='info-date'>
                            <span>Окончание кампании:</span>
                            <span>{startup.start_date}</span>
                        </div>
                    </div>
                    <Payment startup={startup} />
                </div>
                <div className='info-right'>
                    <menu className='info-panel'>
                        <div className={this.state.show === 'info' ? 'tab active' : 'tab'} onClick={() => this.show('info')}>О компании</div>
                        <div className={this.state.show === 'bonus' ? 'tab active' : 'tab'} onClick={() => this.show('bonus')}>Бонусная программа</div>
                    </menu>
                    {this.state.show === 'info' && <Info startup={startup} />}
                    {this.state.show === 'bonus' && <Bonus startup={startup} />}
                </div>
            </div>
        </div>
    }
}

export default class CompanyModal extends Component {
    render() {
        return createPortal(<div className='modal-container'>
            <div className='close-button' onClick={this.props.closeModal}>
                <i className='material-icons close'>close</i>
            </div>
            <ModalContent startup={this.props.startup} />
        </div>, document.getElementById('modal-root'))
    }
}