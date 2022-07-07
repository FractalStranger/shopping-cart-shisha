import React, { useCallback, useEffect } from 'react'
import CollectionShape from '../../shapes/CollectionShape'
import OrderShape from '../../shapes/OrderShape'
import { OrderState } from '../../reducers/orderData'
import { TBPaymentMethodEnum } from '../../shapes/TBPaymentMethod'

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
  order: OrderState
  requestPayment: (method: TBPaymentMethodEnum) => void
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
  order,
  requestPayment,
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
      lang,
    })
  }, [items, personalInfo, submitOrder, collection, lang])

  useEffect(() => {
    handleSubmitOrder()
  }, [])

  useEffect(() => {
    if (order.redirectUrl) {
      window.location.replace(order.redirectUrl)
    }
  }, [order])

  if (order.pending) {
    return <div>Vytvára sa objednávka...</div>
  }
  return (
    <div className="shopping-cart-step_payment">
      {error && (
        <p className="error-request-message">
          <i className="fas fa-exclamation-triangle" />
          {`Pri objednávke nastala chyba, prosím `}
          <a href="#kontakt">kontaktujte nás.</a>
        </p>
      )}
      {order?.data?.order?.payment?.status === 'pending' && (
        <p>Platba práve prebieha, počkajte na </p>
      )}
      {activeStep === 4 && order?.data?.order?.payment?.status !== 'pending' ? (
        <h3>Prosím počkajte, kým vás presmerujeme na platobnú bránu...</h3>
      ) : (
        <>
          <div>
            <p>
              {`Zvoľte si spôsob platby. Po potvrdení spôsobu platby je vaša objednávka ukončená s povinnosťou platby. Bližšie informácie o objednávke a jej stave vám budú doručené mailom na `}
              <strong>{personalInfo.basic.email.value}</strong>.
            </p>
          </div>
          <button
            type="button"
            className="tb_card_pay"
            onClick={() => requestPayment(TBPaymentMethodEnum.TB_CARD_PAY)}
          >
            Card pay
          </button>
        </>
      )}
    </div>
  )
}

export default Payment
