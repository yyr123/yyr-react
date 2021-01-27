// 通过react脚手架[create-react-app]创建的项目，如果需要在项目中配置一些webpack配置，
// 需要在根目录下新建一个名称为config-overrides.js的文件。

const { override, fixBabelImports, addWebpackAlias } = require('customize-cra')
const path = require('path')

module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import) 
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: 'css'
    }),
    //增加路径别名的处理 
    addWebpackAlias({
        ['@']: path.resolve(__dirname, 'src')
    })
)

// react-app-rewired的作用就是在不eject的情况下,覆盖create-react-app的配置
