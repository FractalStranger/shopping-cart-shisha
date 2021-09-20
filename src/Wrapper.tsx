import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import ReservationWrapper from './containers/ReservationWrapperContainer'
import OrderConfirmation from './containers/OrderConfirmationContainer'
import { collections } from './constants/collections'

type Props = {
  activeStep: number
}

const Wrapper = ({ activeStep }: Props) => {
  return (
    <div className="shopping-cart-wrapper">
      {activeStep === 5 ? (
        <OrderConfirmation />
      ) : (
        <>
          {collections.map((collection) => (
            <Route key={collection.name} exact path={`/${collection.name}`}>
              <ReservationWrapper collection={collection} />
            </Route>
          ))}
        </>
      )}
    </div>
  )
}

export default Wrapper
