<!-- 关于store的备注 -->

<!-- redux react的状态管理器 -->

store 就是保存数据的地方， 它实际上是一个object tree（对象树），整个应用只能有一个store，
这个store可以看做king的首相，掌握一切子民（组件）的活动（state）

Redux 提供  createStore 这个函数，用来生成store

import { createStore } from 'redux'
const store = createStore(func)

<!-- func 一般是封装的状态管理函数 然后导出为全局的store -->


createStore 接受一个函数作为参数， 返回一个 store 对象 （首相诞生记）

store （首相）的职责：

1. 维持应用的state
2. 提供 getState() 方法获取 state
3. 提供 dispatch(action 函数的名字在reducer中定义的) 方法更新  state
4. 通过 subscribe(listener)注册监听器
5. 通过 subscribe(listener) 返回的函数注销监听器

ACTION action 定义函数的名字

state的变化，会导致view 页面的变化， 但是，用户接触不到state，所以，state的变化必须是view导致的， ACTION 就是view发出的通知， 表示state应该要发生变化了， 就是store的数据变化来自于用户操作的，根据函数，类型。确定要执行哪些操作

action就是一个通知。它可以看做是首相下面的邮递员，通知子民（组件）改变状态， 它是store数据的唯一来源，一般来说会通过

store.dispatch(func 在actionCreators中定义的函数 )，将action 传到store 仓库中。

action 是一个对象， 其中的type属性是必须的， 里面的字段可以随便加， 表示action的名称

const demoAction = {
    type: MENU_TOGGLE,
    payload: '其他的字段'
}


