import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { middleware as reduxPackMiddleware } from 'redux-pack'

// import logger from 'redux-logger';

import reducer from '../reducers'

function saveToLocalStorage(state: any) {
  try {
    const personalInfo = {
      ...state.personalInfo,
      loading: undefined,
    }
    const newState = {
      // personalInfo,
      lang: state.lang,
    }
    const serializedState = JSON.stringify(newState)
    localStorage.setItem('cartState', serializedState)
  } catch (e) {
    // statements
    console.log(e)
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('cartState')
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    // statements
    console.log(e)
    return undefined
  }
}

const persistedState = loadFromLocalStorage()

let middleware = [] as any
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  middleware = [...middleware, thunk, reduxPackMiddleware, require('redux-logger').default]
} else {
  middleware = [...middleware, thunk, reduxPackMiddleware]
}

const store = createStore(reducer, persistedState, applyMiddleware(...middleware))

store.subscribe(() => saveToLocalStorage(store.getState()))

export default store
