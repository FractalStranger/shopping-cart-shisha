import { connect } from 'react-redux'

import Summary from '../components/Summary'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    items: state.cart.items,
    personalInfo: state.personalInfo,
  }
}

export default connect(mapStateToProps, {
  // proceed,
})(Summary)
