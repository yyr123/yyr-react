// 状态管理。事件处理和对应的类型
import ActionButton from 'antd/lib/modal/ActionButton'
import { MENU_TOGGLE, ADDNUM} from './actionType'


// Action是一个对象，其中的 type属性是必须的。表示 Action 的名称

export const menuToggleAction = () => ({
    type: MENU_TOGGLE
})

// 这里不是完全的箭头函数
export const addNumAction = () =>({
    type: ADDNUM,
    count: 2
})
