import axios from 'axios'

export const PROCEED = 'PROCEED'
export const SUBMIT_ORDER = 'SUBMIT_ORDER'

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
