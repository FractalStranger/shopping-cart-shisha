import { connect } from 'react-redux'

import Wrapper from '../Wrapper'

import { getReservations } from '../actions'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
  }
}

export default connect(mapStateToProps, {
  // getReservations,
})(Wrapper)
