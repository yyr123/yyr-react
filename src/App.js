import './App.css';
import React from 'react';
// 引入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from './utils/loadable'

// 公共模块 主要是头部底部侧边栏，和内容区的封装
const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面 404 500页面 登录页面
const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
const View500 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/500'))
const Login = loadable(() => import(/* webpackChunkName: '404' */ './views/Login'))

const App = () => (
  <Router>
      <Switch>
          <Route path='/' exact render={() => <Redirect to='/index' />} />
          <Route path='/500' component={View500} />
          <Route path='/login' component={Login} />
          <Route path='/404' component={View404} />
          <Route component={DefaultLayout} />
      </Switch>
  </Router>
)

export default App
