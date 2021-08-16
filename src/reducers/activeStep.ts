import { handle } from 'redux-pack'

import { PROCEED, SUBMIT_ORDER } from '../actions'

export const INITIAL_STATE = 1

const activeStep = (state = INITIAL_STATE, action: any) => {
  const { type, step } = action
  switch (type) {
    case PROCEED:
      return step
    case SUBMIT_ORDER:
      return handle(state, action, {
        start: () => {
          return 4
        },
        finish: (prevState: any) => {
          return prevState
        },
        failure: () => {
          return 3
        },
        success: () => {
          return 5
        },
      })
    default:
      return state
  }
}

export default activeStep
