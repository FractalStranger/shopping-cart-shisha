import { connect } from 'react-redux'

import Wrapper from '../Wrapper'

import { getOrder, proceed } from '../actions'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
    order: state.orderData,
  }
}

export default connect(mapStateToProps, {
  // getReservations,
  getOrder,
  proceed,
})(Wrapper)
