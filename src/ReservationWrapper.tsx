import React, { useEffect } from 'react'

import Progress from './containers/ProgressContainer'
import StepItems from './containers/StepItemsContainer'
import Summary from './containers/SummaryContainer'
import CollectionShape from './shapes/CollectionShape'
import ReservationShape from './shapes/ReservationShape'

type Props = {
  collection: CollectionShape
  reservations: ReservationShape
  getReservations: (collection: string) => Promise<void>
}

const ReservationWrapper = ({ collection, reservations, getReservations }: Props) => {
  useEffect(() => {
    getReservations(collection.name)
  }, [])
  console.log(reservations)
  return (
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
  )
}

export default ReservationWrapper
