// 搭建页面骨架
import React, { Component } from 'react';
import { Layout, BackTop, message } from 'antd'
import menu from './menu'
import '@/style/layout.scss'


import AppAside from './AppAside' // 侧边栏导航
import AppHeader from './AppHeader' // 顶部组件

class DefaultLayout extends Component {
    state = { 
        menu: [], // 所有的导航数据
     }

    //  获取导航
     getMenu = (menu) => {
        // 要过滤权限
        let newMenu, auth = JSON.parse(localStorage.getItem('user')).auth
        if (!auth) {
            return menu
        } else {
            newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1)
            return newMenu
        }
    }

    //  判断是否登录
     isLogin = () => {
         if (localStorage.getItem('user')) {
            this.setState({
                menu: this.getMenu(menu)
            })
         } else {
            this.props.history.push('/login')
         }
     }

    //  页面初始化
     componentDidMount() {
         this.isLogin() // 判断是否登录
     }
    render() { 
        let { menuToggle } = this.props // 要传出去的值
        return ( 
            <Layout className='app'>
                <BackTop></BackTop>
                {/* 侧边栏 */}
                <AppAside menuToggle={menuToggle} menu={this.state.menu}></AppAside>
                <Layout style={{marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh'}}>
                    <AppHeader></AppHeader>
                </Layout>
            </Layout>
           
         );
    }
}
 
export default DefaultLayout;