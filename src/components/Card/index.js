import { Component } from 'inferno'
import { observer } from 'inferno-mobx';
import './style.css'


@observer
export default class Card extends Component {
    render() {
        let { startup } = this.props
        return <div className='card'>
            <div className='c-logo' style={{ backgroundImage: `url(${startup.logo})` }}>
            </div>
            <div className='c-info'>
                <p className='c-name'>{startup.name}</p>
                <p className='c-metrics'>
                    <span className=''>
                        <span>Успех:</span>
                        <span className='span bold'>{startup.success_score}%</span>
                    </span>
                    <span className='likes'>
                        <i className='material-icons'>favorite</i>
                        <span className='span'>{startup.liked ? startup.like + 1 : startup.like}</span>
                    </span>
                </p>
                <p className='c-profile'>{startup.profile}</p>

                <p className='c-desc'>{startup.short_desc}</p>
            </div>
            <div className='c-footer'>
                <div className='show-button' onClick={() => this.props.openModal(startup)}>
                    <i className='material-icons'>info</i>
                    <span className='span'>Просмотреть</span></div>
                <div className='favorite-button' onClick={startup.setFavorite}>
                    <i className='material-icons'>star</i>
                    <span className='span'>{startup.favorite ? 'Не отслеживать' : 'Отслеживать'}</span></div>
            </div>
        </div>
    }
}