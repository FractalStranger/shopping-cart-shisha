import { combineReducers } from 'redux'

import activeStep from './activeStep'
import cart from './cart'
import lang from './lang'
import personalInfo from './personalInfo'
import payment from './payment'
import orderData from './orderData'
import fieldsRefs from './fieldsRefs'

export default combineReducers({
  activeStep,
  cart,
  lang,
  personalInfo,
  payment,
  orderData,
  fieldsRefs,
})
