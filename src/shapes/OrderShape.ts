import { CartState } from '../reducers/cart'
import { PersonalInfoState } from '../reducers/personalInfo'

interface OrderShape {
  cart: CartState
  personalInfo: PersonalInfoState
  payment: string
  lang: string
}

export default OrderShape
