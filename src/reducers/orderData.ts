// import { handleActions } from 'redux-actions';
import { Action } from 'redux'
import { handle } from 'redux-pack'

import { SUBMIT_ORDER, GET_ORDER, REQUEST_PAYMENT } from '../actions'
import { setOrderToken } from '../utils'

enum OrderErrors {
  ORDER_ERROR = 'ORDER_ERROR',
  WRONG_TOKEN_ERROR = 'WRONG_TOKEN_ERROR',
}
export interface OrderState {
  data?: Order
  error: boolean | OrderErrors
  pending: boolean
  redirectUrl?: string
}

export const INITIAL_STATE: OrderState = {
  error: false,
  pending: false,
  redirectUrl: undefined,
}

interface OrderInfoAction
  extends Action<typeof SUBMIT_ORDER | typeof GET_ORDER | typeof REQUEST_PAYMENT> {
  payload: any
}

const orderInfo = (state = INITIAL_STATE, action: OrderInfoAction) => {
  const { type, payload } = action
  // console.log(payload)
  switch (type) {
    case SUBMIT_ORDER:
      return handle(state, action, {
        start: () => {
          return {
            error: false,
            pending: true,
          }
        },
        // finish: (prevState: any) => {
        //   return prevState;
        // },
        failure: () => {
          return {
            error: OrderErrors.ORDER_ERROR,
            pending: false,
          }
        },
        success: () => {
          if (payload.data.orderToken) {
            setOrderToken(payload.data.orderToken)
          }
          return {
            data: payload.data,
            error: false,
            pending: false,
          }
        },
      })
    case GET_ORDER:
      return handle(state, action, {
        start: () => {
          return {
            error: false,
            pending: true,
          }
        },
        // finish: (prevState: any) => {
        //   return prevState;
        // },
        failure: () => {
          return {
            error: OrderErrors.WRONG_TOKEN_ERROR,
            pending: false,
          }
        },
        success: () => {
          return {
            data: payload.data,
            error: false,
            pending: false,
          }
        },
      })
    case REQUEST_PAYMENT:
      return handle(state, action, {
        // start: () => {
        //   return {
        //     error: false,
        //     pending: true,
        //   }
        // },
        // failure: () => {
        //   return {
        //     error: OrderErrors.WRONG_TOKEN_ERROR,
        //     pending: false,
        //   }
        // },
        success: (prevState) => {
          return {
            ...prevState,
            redirectUrl: payload.data.redirectUrl,
          }
        },
      })
    default:
      return state
  }
}

export default orderInfo

type PaymentStatusEnum = 'uninitialized' | 'pending' | 'ok' | 'fail' | 'expired'

export interface Order {
  order: {
    personalInfo: {
      basic: {
        email: {
          value: string
        }
        phoneNr: {
          value: string
        }
        dateOfBirth: {
          value: string
        }
      }
      deliveryAddress: {
        district: {
          value: string
        }
        customerNote: {
          value: string
        }
        city: {
          value?: string
        }
        postalCode: {
          value: string
        }
        fullName: {
          value: string
        }
        firstName: {
          value: string
        }
        lastName: {
          value: string
        }
        street: {
          value: string
        }
        street2: {
          value: string
        }
      }
      billingAddress: {
        district: {
          value: string
        }
        customerNote: {
          value: string
        }
        city: {
          value: string
        }
        postalCode: {
          value: string
        }
        fullName: {
          value: string
        }
        firstName: {
          value: string
        }
        lastName: {
          value: string
        }
        street: {
          value: string
        }
        street2: {
          value: string
        }
      }
      deliveryTime: {
        from: {
          value: Date
        }
        to: {
          value: Date
        }
      }
    }
    _id: string
    __t: string
    collectionName: string
    items: {
      _id: string
      item: string
      quantity: number
    }[]
    lang: string
    payment: {
      method: string
      status: PaymentStatusEnum
    }
    index: number
    orderId: string
    status: {
      name: string
      author: {
        email: string
      }
      date: Date
    }
    statusHistory: [
      {
        _id: string
        name: string
        author: {
          email: string
        }
        date: Date
      },
    ]
    dateCreated: Date
    paymentHistory: []
    __v: number
  }
  orderToken?: string
}
