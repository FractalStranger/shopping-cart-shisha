import axios from 'axios'

export const GET_RESERVATIONS = 'GET_RESERVATIONS'
export const PROCEED = 'PROCEED'
export const SUBMIT_ORDER = 'SUBMIT_ORDER'

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
