import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'

import ReservationWrapper from './containers/ReservationWrapperContainer'
import OrderConfirmation from './containers/OrderConfirmationContainer'
import { collections } from './constants/collections'
import { OrderState } from './reducers/orderData'
import { setOrderToken } from './utils'

type Props = {
  activeStep: number
  getOrder: () => void
  order: OrderState
  proceed: (step: number) => void
}

const Wrapper = ({ activeStep, getOrder, order, proceed }: Props) => {
  useEffect(() => {
    getOrder()
  }, [])

  useEffect(() => {
    if (order?.data?.order?.payment) {
      switch (order.data.order.payment.status) {
        case 'ok':
          proceed(5)
          setOrderToken()
          break
        case 'pending':
          proceed(3)
          break
        case 'expired':
          proceed(2)
          break
        default:
          break
      }
    }
  }, [order])

  // const orderStatus = order.order.payment.status

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
