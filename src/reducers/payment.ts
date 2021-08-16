import { CHANGE_PAYMENT } from '../actions/payment'

export const INITIAL_STATE = 'card'

const payment = (state = INITIAL_STATE, action: any) => {
  const { type, value } = action

  switch (type) {
    case CHANGE_PAYMENT:
      return value
    default:
      return state
  }
}

export default payment
