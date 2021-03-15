// import { createStore } from 'redux'
// import reducer from './reducer'

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

// export default store


// 之前是一个状态管理类型。上面的代码不适用

// createStore: 生成store 对象，applyMiddleware： 使redux支持异步执行，需要配合redux-thunk
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducer';

const store = createStore(reducers, applyMiddleware(thunk));


export default store


// 导出 store的话，可以在全局进行调用


