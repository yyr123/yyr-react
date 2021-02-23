import React, { Component } from 'react';
import img500 from '@/assets/images/500.png'

class FailErr extends Component {
    state = {  }
    render() { 
        return ( 
            <div style={{'textAlign': 'center', marginTop: '5rem'}}>
                <img src={img500} alt=""/>
            </div>
          );
    }
}
 
export default FailErr;