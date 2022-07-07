import { handle } from 'redux-pack'
import { Action } from 'redux'

import { PROCEED, SUBMIT_ORDER } from '../actions'

export const INITIAL_STATE = 1

interface ActiveStepAction extends Action {
  step: number
}

const activeStep = (state = INITIAL_STATE, action: ActiveStepAction) => {
  const { type, step } = action
  switch (type) {
    case PROCEED:
      return step
    case SUBMIT_ORDER:
      return handle(state, action, {
        // start: () => {
        //   return 2
        // },
        // finish: (prevState: any) => {
        //   return prevState
        // },
        failure: () => {
          return 2
        },
        // success: () => {
        //   return 3
        // },
      })
    default:
      return state
  }
}

export default activeStep
