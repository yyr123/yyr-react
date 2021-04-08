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


reducer 

action 只是描述有事情发生了这一事实，并没有指明应用如何更新 state, 这正是reducer要做的事情，也就是邮递员（action) 
只负责通知。 具体的组件如何去做就需要是 reducer，

专业解释： store收到action 通知以后，必须给出一个新的state，这样view才会发生变化，这种state的计算过程就叫做reducer



redux-thunk 是一个中间件它可以使我们处理异步事件

 
reducer 只是一个接收 state 和 action，并返回新的 state 的函数


Redux 可以用这三个基本原则来描述：

1. 单一数据源

整个应用的 state 被储存在一颗 object tree, 并且这个object tree 只存在于唯一一个store中

2. state是只读的

唯一改变state的方法就是触发  action（邮递员）， action是一个用于描述已发生事件的普通对象


通过 store.getState()  获取状态管理的变量


3. 使用纯函数来执行修改
 为了描述 action 如何改变state tree， 就需要编写reducers

 reducer 只是一些纯函数，它接收先前的state和action， 并返回新的state， 刚开始你可以只有一个reducer，随着应用变大，
 你可以把它拆成多个小的reducers， 分别独立的制作 state tree 的不同部分，因为reducer只是函数，你可以控制他们被调用的
 顺序， 传入附加数据，甚至编写可复用的reducer来处理一些通用任务。 如分页器



action

我们应该尽量减少在 action 中传递的数据

action 本质上js普通对象, 我们约定action 内必须使用一个字符串类型的 type 字段表示将要 执行的动作，多数情况下， type会定义成 字符串常量， 当应用规模越来越大的时候， 建议使用单独的模块或文件来存放action  （例如 actionCreator.js 文件）

{
    type: '',
    index: 0,
}







 