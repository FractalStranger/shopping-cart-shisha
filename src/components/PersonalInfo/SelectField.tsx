import React, { useCallback } from 'react'
import classnames from 'classnames'
import OrderShape from '../../shapes/OrderShape'
import { districts } from '../../constants/districts'

type Props = {
  personalInfo: OrderShape['personalInfo']
  fieldType: string
  fieldName: string
  fieldLabel: string
  changePersonalInfo: (fieldType: string, field: string, value: string) => void
  setTouched: (fieldType: string, field: string) => void
  childRef: any
}

function SelectField({
  personalInfo,
  fieldType,
  fieldName,
  fieldLabel,
  changePersonalInfo,
  setTouched,
  childRef,
}: Props) {
  const validateField = useCallback(
    (e, fType) => {
      const { name } = e.target
      setTouched(fType, name)
    },
    [setTouched],
  )

  return (
    <div
      className={classnames(
        'input-wrapper',
        'select-wrapper',
        personalInfo[fieldType][fieldName].required &&
          personalInfo[fieldType][fieldName].touched &&
          !personalInfo[fieldType][fieldName].value &&
          'error',
      )}
    >
      {fieldLabel && <label htmlFor={fieldName}>{fieldLabel}</label>}
      <select
        ref={childRef}
        id={fieldName}
        name={fieldName}
        value={personalInfo[fieldType][fieldName].value}
        onChange={(e) => changePersonalInfo(fieldType, e.target.name, e.target.value)}
        onSelect={(e) => validateField(e, fieldType)}
        field-type={fieldType}
      >
        <option value="">Vyber mestskú časť</option>
        {districts.map((item) => (
          <option key={item.name} value={item.name}>
            {item.label}
          </option>
        ))}
      </select>
      {personalInfo[fieldType][fieldName].required && (
        <div className="error-message">
          <span>Pole je povinné</span>
        </div>
      )}
    </div>
  )
}

export default SelectField
