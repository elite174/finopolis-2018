import { Component, render } from 'inferno'
import { observer, inject } from 'inferno-mobx';
import './style.css'
import Card from '../Card';

@inject('store')
@observer
export default class Startups extends Component {

    state = {
        filterValue: ''
    }
    componentDidMount() {
        this.props.store.loadStartups()
    }
    handleChange = (e) => {
        this.setState({ filterValue: e.target.value })
    }
    render() {
        let { store } = this.props
        return <section className='startups'>
            <div className='filter'>
                <span className='filter-profile'>Профиль компании:</span>
                <select onChange={this.handleChange} value={this.state.filterValue}>
                    <option value=''>Все</option>
                    {store.profiles.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div className='startups-list'>
                {store.getByProfile(this.state.filterValue).map(startup => {
                    return <Card id={startup.id} startup={startup} />
                })}
            </div>
        </section>
    }
}