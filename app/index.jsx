import React,{ Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'
import RouterMap from './router/routeMap'

let store = createStore(reducers,applyMiddleware(thunk),window.devToolsExtension ? window.devToolsExtension() : undefined)

class App extends React.Component{
    render() {
        return (
            <Provider store = { store }>
                <RouterMap />
            </Provider>    
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
)