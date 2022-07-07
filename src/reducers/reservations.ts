import { Action } from 'redux'
import { handle } from 'redux-pack'

import { GET_RESERVATIONS } from '../actions'
import ReservationShape from '../shapes/ReservationShape'

export interface ReservationState {
  items: ReservationShape[]
  loading: boolean
}

export const INITIAL_STATE: ReservationState = {
  items: [],
  loading: true,
}

interface CartAction extends Action {
  payload: any
}

const cart = (state = INITIAL_STATE, action: CartAction) => {
  const { type, payload } = action
  switch (type) {
    case GET_RESERVATIONS:
      return handle(state, action, {
        start: (prevState: any) => {
          return prevState
        },
        finish: (prevState: any) => {
          return {
            ...prevState,
            loading: false,
          }
        },
        failure: (prevState: any) => {
          return prevState
        },
        success: (prevState: any) => {
          return {
            ...prevState,
            items: payload.data,
          }
        },
      })
    default:
      return state
  }
}

export default cart
