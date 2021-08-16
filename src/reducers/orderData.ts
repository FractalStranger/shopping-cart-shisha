// import { handleActions } from 'redux-actions';
import { handle } from 'redux-pack'

import { SUBMIT_ORDER } from '../actions'

export const INITIAL_STATE = {
  data: {},
  error: null,
}

const orderInfo = (state = INITIAL_STATE, action: any) => {
  const { type, payload } = action
  switch (type) {
    case SUBMIT_ORDER:
      return handle(state, action, {
        start: () => {
          return {
            error: null,
          }
        },
        // finish: (prevState: any) => {
        //   return prevState;
        // },
        failure: () => {
          return {
            error: payload,
          }
        },
        success: () => {
          return {
            data: payload.data,
            error: null,
          }
        },
      })
    default:
      return state
  }
}

export default orderInfo
