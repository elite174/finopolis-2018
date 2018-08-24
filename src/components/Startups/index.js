import { Component, render } from 'inferno'
import { observer, inject } from 'inferno-mobx';
import './style.css'
import Card from './Card';

@inject('store')
@observer   
export default class Startups extends Component {

    render() {
        return <section className='startups'>
            <div className='filter'>
            </div>
            <div className='startups-list'>
                <Card/>
                <Card/>
            </div>
        </section>
    }
}