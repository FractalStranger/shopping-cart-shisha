import { connect } from 'react-redux'

import Progress from '../components/Progress'
import { proceed } from '../actions'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    activeStep: state.activeStep,
  }
}

export default connect(mapStateToProps, {
  // fetch,
  proceed,
})(Progress)
