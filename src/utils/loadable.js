// loadable 路由组件懒加载
import React, { Component } from 'react';
import Loadable from 'react-loadable'
import NProgress from 'nprogress' // 路由加载进度条
import 'nprogress/nprogress.css'

class loadingComponent extends Component {
    constructor(props) {
        super(props)
        NProgress.start() // 初始化的时候开始加载
    }
    // 组件加载完， 进度条加载完成
    componentDidMount() {
        NProgress.done()
    }

    render() { 
        return ( <div></div> );
    }
}
 
// 把组件的参数传出去
export default (loader, loading = loadingComponent) => {
    return Loadable({
        loader,
        loading
    })
}
