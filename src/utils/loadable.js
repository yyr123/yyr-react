import React, { Component } from 'react'
import Loadable from 'react-loadable'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
class loadingComponent extends Component {
    constructor(props) {
        super(props)
        NProgress.start()
    }
    componentDidMount() {
        NProgress.done()
    }
    render() {
        return <div />
    }
}

export default (loader, loading = loadingComponent) => {
    return Loadable({
        loader,
        loading
    })
}


// 报错信息是，import Loadable ，导出的时候也有Loadable， 所以报错
// React.createElement: type is invalid -- expected a string (for built-in components) or a class/function 
// (for composite components) but got: object. You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.
