import { connect } from 'react-redux'

import Wrapper from '../Wrapper'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
  }
}

export default connect(mapStateToProps, {
  // changePayment,
})(Wrapper)
