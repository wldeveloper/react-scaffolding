/* 
* @Author: Wu Lei
* @Date:   2017-06-11
* @Last Modified by:   Wu Lei
* @Last Modified time: 2017-06-18
*/
import React,{ Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class Home extends Component{
    render() {
        return (
            <div>
                Home <br />
                <Link to="/city">City</Link> <br />
                <Link to="/search/123">Search</Link> <br />
                <Link to="/detail/456">Detail</Link> <br />
                <Link to="/user">User</Link>
            </div>
        )
    }
}

export default Home
