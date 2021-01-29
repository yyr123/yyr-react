import React, { Component } from 'react'
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/tooltip'

class Line extends Component {
    // 组件加载完成后
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('line'));
        // 绘制图表
        myChart.setOption({
            tooltip: {},
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'line',
                data: [5, 20, 36, 10, 10, 20]
            }]
        });
        window.addEventListener('resize', function() {
            myChart.resize()
        })
    }
    render() { 
        
        return ( 
            <div id='line' style={{height: '500px', backgroundColor: '#fff'}}></div>
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
