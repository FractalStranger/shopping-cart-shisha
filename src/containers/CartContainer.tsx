import { connect } from 'react-redux'

import Cart from '../components/Cart'

import { addToCart, removeFromCart } from '../actions/cart'
import { proceed } from '../actions'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
    items: state.cart.items,
    lang: state.lang,
  }
}

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  proceed,
})(Cart)
