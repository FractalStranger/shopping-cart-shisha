export const scrollToRef = (ref: any) => window.scrollTo(0, ref.current.offsetTop)
// export const scrollToRefSmooth = (ref: any) => {
//   setTimeout(() => {
//     ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   }, 1);
// };

export const getOrderToken = () => {
  const serializedState = localStorage.getItem('orderToken')
  if (serializedState === null) return undefined
  return serializedState
}

export const setOrderToken = (orderToken?: string) => {
  if (orderToken) {
    return localStorage.setItem('orderToken', orderToken)
  }

  return localStorage.removeItem('orderToken')
}
