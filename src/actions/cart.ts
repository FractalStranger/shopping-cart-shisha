export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'

// export function loadProductItems(items: any[], lang: string) {
//   const sources = [] as any
//   items.forEach((item: any) => {
//     const source = axios
//       .get(`${process.env.REACT_APP_ENDPOINT}/content/products/${item.item._id}`)
//       .then((data: any) => {
//         if (!data.data.published[lang]) return undefined
//         const loadedItem = {
//           ...item,
//           item: data.data,
//         }
//         return loadedItem
//       })
//       .catch(() => undefined)
//     sources.push(source)
//   })

//   const success = (res: any) => res

//   return {
//     type: LOAD_PRODUCT_ITEMS,
//     promise: Promise.all(sources).then(success),
//   }
// }

export function addToCart(name: string) {
  return {
    type: ADD_TO_CART,
    name,
  }
}

export function removeFromCart(name: string) {
  return {
    type: REMOVE_FROM_CART,
    name,
  }
}
