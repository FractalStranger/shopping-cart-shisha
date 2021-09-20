import React, { useCallback } from 'react'
import CollectionShape from '../../shapes/CollectionShape'
import OrderShape from '../../shapes/OrderShape'

type Props = {
  collection: CollectionShape
  items: string[]
  personalInfo: OrderShape['personalInfo']
  payment: string
  changePayment: (value: string) => void
  error: any
  lang: string
  submitOrder: (order: any) => void
  activeStep: number
}

function Payment({
  collection,
  items,
  personalInfo,
  payment,
  changePayment,
  error,
  lang,
  submitOrder,
  activeStep,
}: Props) {
  const handleSubmitOrder = useCallback(() => {
    // const itemList = items.map((item: any) => ({ _id: item.item._id, quantity: item.quantity }))
    const itemList = items
    const personalInfos = {
      ...personalInfo,
    }
    submitOrder({
      collectionName: collection.name,
      items: itemList,
      personalInfo: personalInfos,
      payment,
      lang,
    })
  }, [items, personalInfo, submitOrder, collection, payment, lang])
  return (
    <div className="shopping-cart-step_payment">
      {error && (
        <p className="error-request-message">
          <i className="fas fa-exclamation-triangle" />
          {`Pri objednávke nastala chyba, prosím `}
          <a href="#kontakt">kontaktujte nás.</a>
        </p>
      )}
      {activeStep === 4 ? (
        <h3>Prosím počkajte, kým vás presmerujeme na platobnú bránu...</h3>
      ) : (
        <>
          <div>
            <p>
              {`Zvoľte si spôsob platby. Po potvrdení spôsobu platby je vaša objednávka ukončená s povinnosťou platby. Bližšie informácie o objednávke a jej stave vám budú doručené mailom na `}
              <strong>{personalInfo.basic.email.value}</strong>.
            </p>
          </div>
          <div className="payment-wrapper">
            <div className="input-wrapper">
              <input
                id="card"
                type="radio"
                name="payment"
                value="card"
                checked={payment === 'card'}
                onChange={(e) => e.target.checked && changePayment(e.target.value)}
              />
              <label htmlFor="card">Platba kartou</label>
            </div>
          </div>
          <button type="button" className="next-button" onClick={handleSubmitOrder}>
            Prejsť na platbu
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
