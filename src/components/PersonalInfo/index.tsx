import React, { useCallback, useEffect, useRef } from 'react'
import classnames from 'classnames'
import { addHours } from 'date-fns'
import OrderShape from '../../shapes/OrderShape'

import Field from './Field'

import { stepLabels } from '../../constants/steps'
import { fields } from '../../constants/personalInfo'
import { getLabel } from './translation'

import {
  validateFields,
  touchAllFieldsPersonalInfo,
  scrollToInvalidFieldsPersonalInfo,
} from '../../utils/fieldsValidation'
import TimeField from './TimeField'
import SelectField from './SelectField'
import { OrderState } from '../../reducers/orderData'
import { ReservationState } from '../../reducers/reservations'

type Props = {
  activeStep: number
  proceed: (step: number) => void
  personalInfo: OrderShape['personalInfo']
  changePersonalInfo: (
    fieldType: string,
    field: string,
    value: string | boolean | Date | [Date, Date] | null,
  ) => void
  setTouched: (fieldType: string, field: string) => void
  savePersonalInfoFieldsRefs: (fieldsRefs: any) => void
  order: OrderState
  reservations: ReservationState
}

function PersonalInfo({
  activeStep,
  proceed,
  personalInfo,
  changePersonalInfo,
  setTouched,
  savePersonalInfoFieldsRefs,
  order,
  reservations,
}: Props) {
  const fieldsRefs = useRef<any>({})
  const fromPickerRef = useRef<any>({})

  const validate = useCallback(() => {
    // show errors
    touchAllFieldsPersonalInfo(personalInfo, setTouched)

    scrollToInvalidFieldsPersonalInfo(personalInfo, fieldsRefs)
  }, [personalInfo, setTouched])

  const handleSavePersonalInfoFields = useCallback(() => {
    savePersonalInfoFieldsRefs(fieldsRefs)
  }, [savePersonalInfoFieldsRefs, fieldsRefs])

  useEffect(handleSavePersonalInfoFields, [fieldsRefs])

  return (
    <div className="shopping-cart-step_personal-info">
      {order.error && <p>{order.error}</p>}
      <div className="section-label">
        <span>Čas</span>
      </div>
      {reservations && (
        <>
          <TimeField
            personalInfo={personalInfo}
            fieldType="deliveryTime"
            fieldName="from"
            fieldLabel={getLabel.from.svk}
            changePersonalInfo={changePersonalInfo}
            setTouched={setTouched}
            childRef={(el: any) => {
              fieldsRefs.current[`deliveryTime-from`] = el
            }}
            minDate={addHours(new Date(), 2)}
            maxDate={personalInfo.deliveryTime.to.value}
            onCalendarClose={() => fromPickerRef.current.setOpen(true)}
            reservations={reservations.items}
          />
          <TimeField
            pickerRef={fromPickerRef}
            personalInfo={personalInfo}
            fieldType="deliveryTime"
            fieldName="to"
            fieldLabel={getLabel.to.svk}
            changePersonalInfo={changePersonalInfo}
            setTouched={setTouched}
            childRef={(el: any) => {
              fieldsRefs.current[`deliveryTime-to`] = el
            }}
            minDate={personalInfo.deliveryTime.from.value}
            // maxDate={personalInfo.deliveryTime.to.value} // koľko dopredu?
            disabled={!personalInfo.deliveryTime.from.value}
            error={
              personalInfo.deliveryTime.from.value &&
              personalInfo.deliveryTime.to.value &&
              personalInfo.deliveryTime.from.value > personalInfo.deliveryTime.to.value
                ? 'Čas odovzdania nesmie byť skôr ako čas doručenia'
                : undefined
            }
            reservations={reservations.items}
          />
        </>
      )}
      {/* {personalInfo.deliveryTime.from.value &&
        personalInfo.deliveryTime.to.value &&
        personalInfo.deliveryTime.from.value > personalInfo.deliveryTime.to.value && (
          <div className="error">Čas odovzdania nesmie byť skôr ako čas doručenia</div>
        )} */}
      {personalInfo.deliveryAddress && (
        <>
          <div className="section-label">
            <span>Miesto doručenia</span>
          </div>
          <SelectField
            personalInfo={personalInfo}
            fieldType="deliveryAddress"
            fieldName="district"
            fieldLabel={getLabel.district.svk}
            changePersonalInfo={changePersonalInfo}
            setTouched={setTouched}
            childRef={(el: any) => {
              fieldsRefs.current[`deliveryAddress-district`] = el
            }}
          />
          {fields.deliveryAddress.map((key) => (
            <Field
              key={key}
              personalInfo={personalInfo}
              fieldType="deliveryAddress"
              fieldName={key}
              fieldLabel={getLabel[key].svk}
              changePersonalInfo={changePersonalInfo}
              setTouched={setTouched}
              childRef={(el: any) => {
                fieldsRefs.current[`deliveryAddress-${key}`] = el
              }}
            />
          ))}
          <Field
            personalInfo={personalInfo}
            fieldType="deliveryAddress"
            fieldName="customerNote"
            fieldLabel={getLabel.customerNote.svk}
            changePersonalInfo={changePersonalInfo}
            setTouched={setTouched}
            childRef={(el: any) => {
              fieldsRefs.current[`deliveryAddress-customerNote`] = el
            }}
            type="textarea"
            placeholder="Pomôž vodičovi nájsť ťa"
          />
        </>
      )}
      <div className="section-label">
        <span>Informácie o objednávateľovi</span>
      </div>
      <Field
        personalInfo={personalInfo}
        fieldType="deliveryAddress"
        fieldName="fullName"
        fieldLabel={getLabel.fullName.svk}
        changePersonalInfo={changePersonalInfo}
        setTouched={setTouched}
        childRef={(el: any) => {
          fieldsRefs.current[`deliveryAddress-fullName`] = el
        }}
      />
      {fields.basic.map((key) => (
        <Field
          key={key}
          personalInfo={personalInfo}
          fieldType="basic"
          fieldName={key}
          fieldLabel={getLabel[key].svk}
          changePersonalInfo={changePersonalInfo}
          setTouched={setTouched}
          childRef={(el: any) => {
            fieldsRefs.current[`basic-${key}`] = el
          }}
        />
      ))}
      <Field
        personalInfo={personalInfo}
        fieldType="basic"
        fieldName="phoneNr"
        fieldLabel={getLabel.phoneNr.svk}
        changePersonalInfo={changePersonalInfo}
        setTouched={setTouched}
        childRef={(el: any) => {
          fieldsRefs.current[`basic-phoneNr`] = el
        }}
        placeholder="+421"
        onClick={
          !personalInfo.basic.phoneNr.value
            ? () => changePersonalInfo('basic', 'phoneNr', '+421')
            : undefined
        }
      />
      <div
        className={classnames(
          'input-wrapper',
          'checkbox',
          personalInfo.consents.dataProcessing.required &&
            personalInfo.consents.dataProcessing.touched &&
            !personalInfo.consents.dataProcessing.value &&
            'error',
        )}
      >
        <input
          type="checkbox"
          checked={personalInfo.consents.dataProcessing.value}
          id="dataProcessing"
          name="dataProcessing"
          field-type="consents"
          onChange={(e) => changePersonalInfo('consents', e.target.name, e.target.checked)}
          ref={(el: any) => {
            fieldsRefs.current[`consents-dataProcessing`] = el
          }}
        />
        <label htmlFor="dataProcessing" className="label-text horizontal">
          <div className="text">
            Súhlasím so spracovaním{' '}
            <a href="/gdpr" target="_blank">
              osobných údajov
            </a>
          </div>
        </label>
        {personalInfo.consents.dataProcessing.required && (
          <div className="error-message">
            <span>Povinné</span>
          </div>
        )}
      </div>
      <button
        type="button"
        className="next-button"
        onClick={validateFields(personalInfo) ? () => proceed(activeStep + 1) : validate}
      >
        {stepLabels.next[activeStep - 1].label}
        <i className={stepLabels.next[activeStep - 1].iconClasses} />
      </button>
    </div>
  )
}

export default PersonalInfo
