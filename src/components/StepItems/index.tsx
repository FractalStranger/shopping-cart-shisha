import React from 'react'

import Cart from '../../containers/CartContainer'
import PersonalInfo from '../../containers/PersonalInfoContainer'
import Payment from '../../containers/PaymentContainer'
import OrderConfirmation from '../../containers/OrderConfirmationContainer'
import CollectionShape from '../../shapes/CollectionShape'

type Props = {
  activeStep: number
  collection: CollectionShape
}

function StepItems({ activeStep, collection }: Props) {
  return (
    <div className="shopping-cart-step">
      {activeStep === 1 && <Cart />}
      {activeStep === 2 && <PersonalInfo />}
      {activeStep === 3 && <Payment collection={collection} />}
      {activeStep === 4 && <Payment collection={collection} />}
    </div>
  )
}

export default StepItems
