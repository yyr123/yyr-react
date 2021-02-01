import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/legend'

class Pie extends Component {
    // 组件加载完成
    componentDidMount() {
        let myPie = echarts.init(document.getElementById('pie'))
        myPie.setOption({
            legend: {
                orient: "vertical",
                left: "left",
                data: ["Apple", "Grapes", "Pineapples", "Oranges", "Bananas"]
              },
              series: [{
                type: "pie",
                data: [{
                  value: 335,
                  name: "Apple"
                }, {
                  value: 310,
                  name: "Grapes"
                }, {
                  value: 234,
                  name: "Pineapples"
                }, {
                  value: 135,
                  name: "Oranges"
                }, {
                  value: 1548,
                  name: "Bananas"
                }]
              }]
        })
    }
    render() { 
        return ( 
            <div id="pie" style={{height: '300px', backgroundColor: '#fff'}}></div>
         );
    }
}
 
export default Pie;