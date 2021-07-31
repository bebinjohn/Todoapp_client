import React from 'react'
import ReactDom from 'react-dom'
import App from './App.js'
import './index.css'
import {createStore,compose,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import Reducers from './reducers/index'
const store=createStore(Reducers,compose(applyMiddleware(thunk)))

ReactDom.render(
    <Provider store={store}>
        <App/>
    </Provider>
    ,
    document.getElementById('root')
)