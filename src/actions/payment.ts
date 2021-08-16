export const CHANGE_PAYMENT = 'CHANGE_PAYMENT'

export function changePayment(value: string) {
  return {
    type: CHANGE_PAYMENT,
    value,
  }
}
