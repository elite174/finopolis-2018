import { Component, createPortal } from 'inferno'
import './style.css'
import { observer } from 'inferno-mobx';

const Bonus = ({ startup }) => {
    return <div className='bonus'>
    </div>
}

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
@observer
class ModalContent extends Component {
    state = {
        show: 'info'
    }

    show = show => this.setState({ show })
    render() {
        let { startup } = this.props
        return <div className='modal-content'>
            <div className='modal-header' style={{ backgroundImage: `url(${startup.logo})` }}>
                <div className='header-wall'>
                    <p className='modal-profile'>{startup.profile}</p>
                    <p className='modal-name'>{startup.name}</p>
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