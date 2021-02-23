// 路由文件

// import loadable from '@/utils/loadable'
// const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

import Index from '@/views/Index'
import ButtonView from '@/views/PublicView/Button'
import TableView from '@/views/show/table'

const routes = [
   { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
   { path: '/public/button', exact: false, name: '表格', component: ButtonView, auth: [1] },
   { path: '/show/table', exact: false, name: '按钮', component: TableView, auth: [1] },
]

export default routes