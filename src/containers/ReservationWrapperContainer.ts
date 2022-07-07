import { connect } from 'react-redux'

import ReservationWrapper from '../ReservationWrapper'

import { getReservations } from '../actions'

// TODO: add types
function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
    reservations: state.reservations,
  }
}

export default connect(mapStateToProps, {
  getReservations,
})(ReservationWrapper)
