import React from 'react'
import { Route } from 'react-router-dom'

import Progress from './containers/ProgressContainer'
import StepItems from './containers/StepItemsContainer'
import Summary from './containers/SummaryContainer'
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
              <div className="container">
                <div className="row">
                  <div className="col-lg-12">
                    <Progress />
                  </div>
                </div>
                <div className="shopping-cart-inner-wrapper">
                  <div className="row">
                    <div className="col-lg-7 offset-lg-1 shopping-cart-steps-wrapper">
                      <StepItems collection={collection} />
                    </div>
                    <div className="col-lg-4">
                      <Summary collection={collection} />
                    </div>
                  </div>
                </div>
              </div>
            </Route>
          ))}
        </>
      )}
    </div>
  )
}

export default Wrapper
