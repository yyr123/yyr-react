
// 导航封装主要是在这
import React, { Component } from 'react';
import { Menu} from 'antd'
import { Link, withRouter } from 'react-router-dom'
// import SubMenu from 'antd/lib/menu/SubMenu';
// import MenuItem from 'antd/lib/menu/MenuItem';

class CustomMenu extends Component {
    state = { 
        openKeys: [], // 打开的导航
        selectedKeys: [] // 选中的值
     }

     onOpenChange = (openKeys) =>{
        //  console.log(openKeys, '打开了')
         if (openKeys.length === 0 || openKeys.length === 1) {
             this.setState({
                openKeys
             })
             return 
         }

        //   最新展开的 SubMenu
        const latestOpenKey = openKeys[openKeys.length - 1]

        // 这里与定义的路由规则有关 这里不懂
        if (latestOpenKey.includes(openKeys[0])) {
            this.setState({
                openKeys
            })
        } else {
            this.setState({
                openKeys: [latestOpenKey]
            })
        }
    }

     // 循环遍历一级导航，生成menu
     renderSubMenu = ({ key, title, subs }) => {
        return (
            <Menu.SubMenu
                key={key}
                title={
                    <span>
                        {title}
                    </span>
                }
                >
               
               {/* subs 一级导航下面的数组，如果有的话，就加载二级导航， */}
               {/* 没有的话，就加载本身 */}

                {subs && subs.map(item => {
                    return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                })}

            </Menu.SubMenu>
        )
     }

    // 循环二级导航
    renderMenuItem = ({ key, title}) => {
        // console.log(key, '当前的key值')
        return (
            <Menu.Item key={key}>
                {/* link进行路由跳转 */}
                <Link to={key}>
                    <span>{title}</span>  
                </Link>
            </Menu.Item>
        )
    }
    render() { 
        let { openKeys, selectedKeys } = this.state
        return ( 
            <Menu
             mode='inline'
             theme='dark'
             openKeys={openKeys}
             selectedKeys={selectedKeys}
             onClick={({ key }) => this.setState({selectedKeys: [key]})}
             onOpenChange={this.onOpenChange}
            >
                {this.props.menu && this.props.menu.map(item => {
                    return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
                })}
            

            </Menu>
       );
    }
}
 
export default withRouter(CustomMenu);


// 梳理逻辑
// 根据固定的导航的数据进行遍历，先遍历一级的，如果一级下面有数组的话，
// 就渲染二级导航

// 没有二级导航的话，就直接走渲染MenuItem 方法
// 有二级导航的话，就走一级导航渲染，之后再根据一级导航判断是否有二级导航

// DOM结构

// <Menu>
//     <SubMenu>
//         <MenuItem></MenuItem>
//     </SubMenu>
// </Menu>