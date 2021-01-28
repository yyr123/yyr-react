// 路由文件

// import loadable from '@/utils/loadable'
// const Index = loadable(() => import(/* webpackChunkName: 'index' */ '@/views/Index'))

import Index from '@/views/Index'
import ButtonView from '@/views/PublicView/Button'

const routes = [
   { path: '/index', exact: true, name: 'Index', component: Index, auth: [1] },
   { path: '/public/button', exact: false, name: '按钮', component: ButtonView, auth: [1] },

]

export default routes