// import logo from './logo.svg';
import './App.css';
import React from 'react';
// 引入路由
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import loadable from './utils/loadable'

// 公共模块 主要是头部底部侧边栏，和内容区的封装
const DefaultLayout = loadable(() => import(/* webpackChunkName: 'default' */ './containers'))

// 基础页面 404 500页面 登录页面
const View404 = loadable(() => import(/* webpackChunkName: '404' */ './views/Others/404'))
// const View500 = loadable(() => import)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
      </header>
    </div>
  );
}

export default App;
