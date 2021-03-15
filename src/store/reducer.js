

// 这里是事件真正开始处理的逻辑

import { MENU_TOGGLE, ADDNUM } from './actionType'
import { combineReducers } from 'redux'

const defaultStore = {
    menuToggle: false,
    num: 0, // 定义默认值是0
}

const handleToggle = (state = defaultStore, action) => {
    switch (action.type) {
        case MENU_TOGGLE:
            return { ...state, menuToggle: !state.menuToggle }
        default:
            return state
    }
}

const handleAddNum = (state = defaultStore, action) => {
    switch (action.type) {
        case ADDNUM: 
            return {...state, num: state.num + action.count}
        // 默认的必须要写上，要不然报错
        default: 
           return state
    }
}


// 导出所有的
const reducers = combineReducers({
    handleAddNum,
    handleToggle
}) 

export default reducers