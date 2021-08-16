import { Action } from 'redux'
import { handle } from 'redux-pack'

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart'
import { SUBMIT_ORDER } from '../actions/index'

export interface CartState {
  items: Array<string>
  loading: boolean
}

export const INITIAL_STATE: CartState = {
  items: [],
  loading: true,
}

interface CartAction extends Action {
  name: string
}

const cart = (state = INITIAL_STATE, action: CartAction) => {
  const { type, name } = action
  let newItems: Array<string>
  switch (type) {
    case ADD_TO_CART:
      newItems = [...state.items]
      newItems.push(name)
      return {
        ...state,
        items: newItems,
      }
    case REMOVE_FROM_CART:
      newItems = state.items.filter((item: string) => item !== name)
      return {
        ...state,
        items: newItems,
      }
    case SUBMIT_ORDER:
      return handle(state, action, {
        start: (prevState: any) => {
          return prevState
        },
        finish: (prevState: any) => {
          return prevState
        },
        failure: (prevState: any) => {
          return prevState
        },
        success: () => {
          return INITIAL_STATE
        },
      })
    default:
      return state
  }
}

export default cart
