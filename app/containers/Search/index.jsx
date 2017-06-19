/* 
* @Author: Wu Lei
* @Date:   2017-06-11 21:56:25
* @Last Modified by:   Wu Lei
* @Last Modified time: 2017-06-12
*/
import React,{ Component } from 'react'

class Search extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        const match = this.props.match

        return (
            <div>
                Search { match.params.keyword }
            </div>
        )
    }
}

export default Search
