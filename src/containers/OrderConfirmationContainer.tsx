import { connect } from 'react-redux'

import OrderConfirmation from '../components/OrderConfirmation'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    orderData: state.orderData.data,
  }
}

export default connect(mapStateToProps)(OrderConfirmation)
