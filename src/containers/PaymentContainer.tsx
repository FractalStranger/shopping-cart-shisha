import { connect } from 'react-redux'

import Payment from '../components/Payment'

import { submitOrder } from '../actions'
import { changePayment } from '../actions/payment'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    payment: state.payment,
    items: state.cart.items,
    personalInfo: state.personalInfo,
    error: state.orderData.error,
    activeStep: state.activeStep,
    lang: state.lang,
  }
}

export default connect(mapStateToProps, {
  changePayment,
  submitOrder,
})(Payment)
