import { connect } from 'react-redux'

import StepItems from '../components/StepItems'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
  }
}

export default connect(mapStateToProps, {
  // fetch,
})(StepItems)
