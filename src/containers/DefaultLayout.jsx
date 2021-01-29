// 搭建页面骨架
import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, BackTop, message } from 'antd'
import { menuToggleAction } from '@/store/actionCreators'
import routes from '@/routes' // 引入路由文件
 
import menu from './menu'
import '@/style/layout.scss'


import AppAside from './AppAside' // 侧边栏导航
import AppHeader from './AppHeader' // 顶部组件


const { Content } = Layout
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

    //  退出登录、
     loginOut = ()=> {
         localStorage.clear()
         message.success('退出成功')
         setTimeout(() => {
            this.props.history.push('/login')
         }, 300)
     }

     menuClick = ()=> {

     }

    //  页面初始化
     componentDidMount() {
         this.isLogin() // 判断是否登录
     }
    render() { 
        // this.props 接受子组件传过来的值
        // props 要传给父组件的值
        
        let { menuToggle, menuClick} = this.props // 要传出去的值
        let { auth } = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : ''

        return ( 
            <Layout className='app'>
                <BackTop></BackTop>
                {/* 左边侧边栏 */}
                <AppAside menuToggle={menuToggle} menu={this.state.menu}></AppAside>
                {/* 右边的内容 */}
                <Layout style={{marginLeft: menuToggle ? '80px' : '200px', minHeight: '100vh'}}>
                    {/* 头部组件 */}
                    <AppHeader 
                        menuClick={menuClick}
                        loginOut={this.loginOut}
                        menuToggle={menuToggle}
                     ></AppHeader>

                     {/* 页面主题根据路由渲染页面！！！ */}
                     <Content className='content'>
                         <Switch>
                            {routes.map(item =>{
                                return (
                                    <Route
                                    key={item.path}
                                    path={item.path}
                                    exact={item.exact}
                                    render={props =>
                                        !auth ? (
                                            <item.component {...props} />
                                        ) : item.auth && item.auth.indexOf(auth) !== -1 ? (
                                            <item.component {...props} />
                                        ) : (
                                            // 这里也可以跳转到 403 页面
                                            <Redirect to='/404' {...props} />
                                        )
                                    }></Route> 
                                )
                            })}
                            <Redirect to='/404' />
                         </Switch>
                     </Content>
                </Layout>
            </Layout>
         );
    }
}
const stateToProp = state => ({
    menuToggle: state.menuToggle
})

const dispatchToProp = dispatch => ({
    menuClick() {
        dispatch(menuToggleAction())
    }
})
 
export default withRouter(
    connect(
        stateToProp,
        dispatchToProp
    )(DefaultLayout)
)
