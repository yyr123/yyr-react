import './App.css';
// 引入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import React, {Suspense, lazy } from 'react';


// 公共模块 主要是头部底部侧边栏，和内容区的封装
const DefaultLayout = lazy(() => import('./containers'))


// 基础页面 404 500页面 登录页面
const View404 = lazy(() => import('./views/Others/404'))
const View500 = lazy(() => import('./views/Others/500'))
const Login = lazy(() => import('./views/Login'))

const App = () => (
  <Router>
    {/* Suspense 动态懒加载组件 */}
     <Suspense fallback={<div>Loading...</div>}>
        <Switch>
            <Route path='/' exact render={() => <Redirect to='/index' />} />
            <Route path='/500' component={View500} />
            <Route path='/login' component={Login} />
            <Route path='/404' component={View404} />
            
            {/* 默认是加载框架图，判断是否是登录，再跳转页面 */}
            <Route component={DefaultLayout} />
        </Switch>
      </Suspense>
  </Router>
)

export default App
