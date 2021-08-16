import React, { useCallback, useMemo } from 'react'

import { differenceInDays, subSeconds } from 'date-fns'
import OrderShape from '../../shapes/OrderShape'

import { validateFields } from '../../utils/fieldsValidation'
import CollectionShape from '../../shapes/CollectionShape'
import { flavors } from '../../constants/flavors'
import { districts } from '../../constants/districts'

type Props = {
  items: string[]
  personalInfo: OrderShape['personalInfo']
  collection: CollectionShape
}

function Summary({ items, personalInfo, collection }: Props) {
  // const vat = subtotal * 0.077;

  // const handleValidatePersonalInfo = useCallback(() => {
  //   // show errors
  //   touchAllFieldsPersonalInfo(personalInfo, setTouched)

  //   scrollToInvalidFieldsPersonalInfo(personalInfo, fieldsRefs.personalInfo)
  // }, [personalInfo, setTouched, fieldsRefs])

  // const handleSubmitOrder = useCallback(() => {
  //   const itemList = items.map((item: any) => ({ _id: item.item._id, quantity: item.quantity }))
  //   const personalInfos = {
  //     ...personalInfo,
  //   }
  //   submitOrder({ items: itemList, personalInfo: personalInfos, payment, lang })
  // }, [items, personalInfo, payment, lang, submitOrder])

  const getTotalDays = useMemo(() => {
    if (personalInfo.deliveryTime.from.value && personalInfo.deliveryTime.to.value) {
      return (
        differenceInDays(
          subSeconds(personalInfo.deliveryTime.to.value, 1),
          personalInfo.deliveryTime.from.value,
        ) + 1
      )
    }
    return 1
  }, [personalInfo.deliveryTime.from, personalInfo.deliveryTime.to])

  const getFlavorByName = useCallback(
    (name) => flavors.find((item) => item.name === name) || { label: '', name: '', price: 0 },
    [],
  )

  const getDistrict = useMemo(
    () => districts.find((item) => personalInfo.deliveryAddress.district.value === item.name),
    [personalInfo.deliveryAddress.district.value],
  )

  const getFlavorsSubtotal = useMemo(
    () =>
      items
        .slice(1)
        .map((item) => getFlavorByName(item).price)
        .reduce((a, b) => a + b, 0),
    [getFlavorByName, items],
  )

  const getCollectionPriceString = useMemo(() => {
    switch (getTotalDays) {
      case 1:
        return `${collection.price} € / deň`
      case 2:
      case 3:
      case 4:
        return `${collection.price * getTotalDays} €  (${getTotalDays} dni)`
      default:
        return `${collection.price * getTotalDays} €  (${getTotalDays} dní)`
    }
  }, [collection.price, getTotalDays])

  return (
    <>
      {validateFields(personalInfo)}
      <div className="shopping-cart-summary-wrapper">
        <div className="shopping-cart-summary-overhead">Balík</div>
        <h1>{collection.label}</h1>
        <img src={collection.imageUrl} alt={collection.label} />
        <ul>
          <li>{collection.description}</li>
          <li>Výber jednej príchute tabaku</li>
          <li>2 Uhlíky, kliešte a zapalovač</li>
        </ul>
        {!!items.length && (
          <div>
            <h4>Príchuť</h4>
            <ul>
              <li key={getFlavorByName(items[0]).name}>{getFlavorByName(items[0]).label}</li>
            </ul>
          </div>
        )}
        <div className="sub-price">
          {getTotalDays === 1 ? `${collection.price} € / deň` : getCollectionPriceString}
        </div>
        {items.length > 1 && (
          <div>
            <h4>Extra príchute</h4>
            <ul>
              {items.slice(1).map((item) => (
                <li key={getFlavorByName(item).name}>{getFlavorByName(item).label}</li>
              ))}
            </ul>
            <div className="sub-price">{`${getFlavorsSubtotal} €`}</div>
          </div>
        )}
        <div>
          <h4>Doprava</h4>
          <div className="delivery-address-detail">
            {personalInfo.deliveryAddress.district.value ? getDistrict?.label : '-'}
          </div>
          <div className="sub-price">{getDistrict ? `${getDistrict?.price} €` : '-'}</div>
        </div>
        <div>
          <h4>SPOLU</h4>
          <div className="total-price">
            {collection.price * getTotalDays + getFlavorsSubtotal + (getDistrict?.price || 0)} €
          </div>
        </div>
      </div>
    </>
  )
}

export default Summary
