import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'


class Line extends Component {
    // 组件加载完成后
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('line'));
        // 绘制图表
        myChart.setOption({
            title: {
                text: '某楼盘销售情况',
                subtext: '纯属虚构'
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:['意向','预购','成交']
            },
            toolbox: {
                show: true,
                feature: {
                    magicType: {show: true, type: ['stack', 'tiled']},
                    saveAsImage: {show: true}
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一','周二','周三','周四','周五','周六','周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                name: '成交',
                type: 'line',
                smooth: true,
                data: [10, 12, 21, 54, 260, 830, 710]
            },
            {
                name: '预购',
                type: 'line',
                smooth: true,
                data: [30, 182, 434, 791, 390, 30, 10]
            },
            {
                name: '意向',
                type: 'line',
                smooth: true,
                data: [1320, 1132, 601, 234, 120, 90, 20]
            }]
        });
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() { 
        
        return ( 
            <div id='line' style={{height: '300px', backgroundColor: '#fff'}}></div>
         );
    }
}
 
export default Line;


// 设置中出现以下报错
// Component series.line not exists. Load it first.

// 解决方法，要先引入对应的类型：
// import 'echarts/lib/chart/line'
// import 'echarts/lib/component/tooltip'
// import 'echarts/lib/component/title'

// style={{height: '500px'}}  必须是500px才能展示
