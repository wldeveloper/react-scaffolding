/* 
* @Author: Wu Lei
* @Date:   2017-06-11
* @Last Modified by:   Wu Lei
* @Last Modified time: 2017-06-14
*/
import React,{ Component } from 'react'

class Detail extends Component{
    render() {
        return (
            <div style={{color:'blue'}}>
                Detail <br />
                { this.props.match.params.id }
            </div>
        )
    }
}

export default Detail
