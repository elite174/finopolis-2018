import { Component, render } from 'inferno'
import { observer, inject } from 'inferno-mobx';
import './style.css'
import Card from '../Card';
import CompanyModal from '../CompanyModal';

@inject('store')
@observer
export default class Startups extends Component {

    state = {
        filterValue: '',
        showModal: false,
        startup: null
    }
    componentDidMount() {
    }
    handleChange = (e) => {
        this.setState({ filterValue: e.target.value })
    }

    openModal = (startup) => {
        this.setState({
            showModal: true,
            startup: startup
        })
        console.log('open')
    }

    closeModal = () => this.setState({ showModal: false })
    render() {
        let { store, favorite } = this.props
        let count = store.getByProfile(this.state.filterValue, favorite).length
        return <section className='startups'>
            <div className='filter'>
                <span className='filter-profile'>Профиль компании:</span>
                <select onChange={this.handleChange} value={this.state.filterValue}>
                    <option value=''>Все</option>
                    {store.profiles(favorite).map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div className={count !== 0 ? 'startups-list' : 'startups-list empty'} >
                {
                    store.getByProfile(this.state.filterValue, favorite).map(startup => {
                        return <Card openModal={this.openModal} id={startup.id} startup={startup} />
                    })
                }
                {count===0 && <span>Нет компаний для отображения</span>}
            </div>
            {this.state.showModal && <CompanyModal closeModal={this.closeModal} startup={this.state.startup} />}
        </section>
    }
}