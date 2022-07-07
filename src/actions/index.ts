import axios from 'axios'
import { TBPaymentMethodEnum } from '../shapes/TBPaymentMethod'
import { getOrderToken } from '../utils'

export const GET_RESERVATIONS = 'GET_RESERVATIONS'
export const PROCEED = 'PROCEED'
export const GET_ORDER = 'GET_ORDER'
export const SUBMIT_ORDER = 'SUBMIT_ORDER'
export const REQUEST_PAYMENT = 'REQUEST_PAYMENT'

export function getReservations(collection: string) {
  const source = axios.get(`${process.env.REACT_APP_ENDPOINT}/orders/reservations/${collection}`)

  const success = (res: any) => res

  return {
    type: GET_RESERVATIONS,
    promise: source.then(success),
  }
}

export function proceed(step: number) {
  return {
    type: PROCEED,
    step,
  }
}

export function getOrder() {
  const orderToken = getOrderToken()
  const source = axios.get(`${process.env.REACT_APP_ENDPOINT}/orders?orderToken=${orderToken}`)

  const success = (res: any) => res

  return {
    type: GET_ORDER,
    promise: source.then(success),
  }
}

export function submitOrder(order: any) {
  const source = axios.post(`${process.env.REACT_APP_ENDPOINT}/orders`, {
    item: JSON.stringify(order),
  })

  const success = (res: any) => res

  return {
    type: SUBMIT_ORDER,
    promise: source.then(success),
  }
}

export function requestPayment(paymentMethod: TBPaymentMethodEnum) {
  const orderToken = getOrderToken()
  const source = axios.post(`${process.env.REACT_APP_ENDPOINT}/orders/payment/request`, {
    orderToken,
    paymentMethod,
  })

  const success = (res: any) => res

  return {
    type: REQUEST_PAYMENT,
    promise: source.then(success),
  }
}
