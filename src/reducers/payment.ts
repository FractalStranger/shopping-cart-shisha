import { Action } from 'redux'
import { CHANGE_PAYMENT } from '../actions/payment'

export const INITIAL_STATE = 'card'

interface PaymentAction extends Action<typeof CHANGE_PAYMENT> {
  value: string
}

const payment = (state = INITIAL_STATE, action: PaymentAction) => {
  const { type, value } = action

  switch (type) {
    case CHANGE_PAYMENT:
      return value
    default:
      return state
  }
}

export default payment
