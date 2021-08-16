/* eslint-disable no-restricted-syntax */
import OrderShape from '../shapes/OrderShape'

export function validateFields(personalInfo: OrderShape['personalInfo']) {
  const basicError = Object.keys(personalInfo.basic).filter((key) => {
    return personalInfo.basic[key].required && !personalInfo.basic[key].value
  }).length
  const deliveryAddressError = Object.keys(personalInfo.deliveryAddress).filter((key) => {
    return personalInfo.deliveryAddress[key].required && !personalInfo.deliveryAddress[key].value
  }).length
  const deliveryTimeError = Object.keys(personalInfo.deliveryTime).filter((key) => {
    return personalInfo.deliveryTime[key].required && !personalInfo.deliveryTime[key].value
  }).length
  const consentsAcceptedError = Object.keys(personalInfo.consents).filter((key) => {
    return personalInfo.consents[key].required && !personalInfo.consents[key].value
  }).length
  const invalidDates =
    personalInfo.deliveryTime.from.value &&
    personalInfo.deliveryTime.to.value &&
    personalInfo.deliveryTime.from.value > personalInfo.deliveryTime.to.value
  const requiredFulfilled =
    !basicError &&
    (!personalInfo.differentDeliveryAddress || !deliveryAddressError) &&
    !deliveryTimeError &&
    !consentsAcceptedError &&
    !invalidDates
  return requiredFulfilled
}

export function touchAllFieldsPersonalInfo(
  personalInfo: OrderShape['personalInfo'],
  setTouched: (fieldType: string, field: string) => void,
) {
  Object.keys(personalInfo.basic).forEach((key) => setTouched('basic', key))
  Object.keys(personalInfo.deliveryAddress).forEach((key) => setTouched('deliveryAddress', key))
  Object.keys(personalInfo.deliveryTime).forEach((key) => setTouched('deliveryTime', key))
  Object.keys(personalInfo.consents).forEach((key) => setTouched('consents', key))
}

export function scrollToInvalidFieldsPersonalInfo(
  personalInfo: OrderShape['personalInfo'],
  fieldsRefs: any,
) {
  for (const key of Object.keys(fieldsRefs.current)) {
    const fieldType = fieldsRefs.current[key].getAttribute('field-type')
    const fieldName = fieldsRefs.current[key].name
    const field = personalInfo[fieldType][fieldName]
    if (
      personalInfo.deliveryTime.from.value &&
      personalInfo.deliveryTime.to.value &&
      personalInfo.deliveryTime.from.value > personalInfo.deliveryTime.to.value
    ) {
      fieldsRefs.current['deliveryTime-to']
        .closest('.input-wrapper')
        .scrollIntoView({ behavior: 'smooth', block: 'center' })
      break
    }
    if (field.required && !field.value) {
      fieldsRefs.current[key]
        .closest('.input-wrapper')
        .scrollIntoView({ behavior: 'smooth', block: 'center' })
      break
    }
  }
}
