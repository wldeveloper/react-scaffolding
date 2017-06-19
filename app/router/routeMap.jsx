import React,{ Component } from 'react'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { connect } from 'react-redux'

// import App from '../containers'
import Home from '../containers/Home'
import City from '../containers/City'
import User from '../containers/User'
import Search from '../containers/Search'
import Detail from '../containers/Detail'
import NotFound from '../containers/404'

const history = createHistory()

class RouterMap extends Component{
    constructor(props) {
        super(props)
    }

    render() {
        var match = this.props.match

        return (
            <div>
                {/*<Router history={ history }>*/}
                    <Switch>
                        <Route exact path="/" component={ Home } />
                        <Route exact path="/city" component={ City } />
                        <Route exact path="/search/:keyword" render = {(routeProps) => {
                            return <Search {...this.props} {...routeProps} />
                        }} />
                        <Route exact path="/detail/:id" component={ Detail } />
                        <Route exact path="/user" component={ User } />
                        <Route component={ NotFound } />
                    </Switch>
                {/*</Router>*/}
            </div>
        )
    }
}

class Content extends Component{
    render() {
        return (
            <div>
                <Router history={ history }>
                    <Route component={ RouterMap } />
                </Router>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {

    }
}

function mapDispatchToProps(dispatch, ownprops) {
    return {
        initCity: (cityName) => {
            dispatch({
                type:'AAA',
                name:cityName
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Content)