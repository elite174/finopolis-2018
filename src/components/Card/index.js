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
                <p className='c-profile'>{startup.profile}</p>
                <p className='c-desc'>{startup.short_desc}</p>
            </div>
            <div className='c-footer'>
                <div className='show-button'>
                    <i className='material-icons'>info</i>
                    <span className='span'>Просмотреть</span></div>
                <div className='favorite-button'>
                <i className='material-icons'>star</i>
                    <span className='span'>В избранное</span></div>
            </div>
        </div>
    }
}