import { Component } from 'inferno'
import './style.css'


export default class Invest extends Component {
    componentDidMount() {
        let option = {
            title: {
                text: 'Мои инвестиции за 2018 год'
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                },
                formatter: "{c} руб."
            },
            legend: {
                data: ['Объём инвестиций']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Январь', "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август"]
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    itemStyle: {
                        color: '#ffdd2d'
                    },
                    name: 'Объём инвестиций',
                    type: 'line',
                    stack: '总量',
                    areaStyle: {
                        normal: {},
                    },
                    data: [120, 132, 101, 134, 90, 230, 210, 340]
                },

            ]
        };

        let chart = window.echarts.init(document.getElementById('chart'))
        chart.setOption(option)
    }
    render() {
        return <div className='invest'>
            <div id='chart'></div>
        </div>

    }
}