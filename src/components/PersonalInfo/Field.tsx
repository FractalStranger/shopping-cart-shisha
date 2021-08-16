import React, { useCallback } from 'react'
import classnames from 'classnames'
import OrderShape from '../../shapes/OrderShape'

type Props = {
  personalInfo: OrderShape['personalInfo']
  fieldType: string
  fieldName: string
  fieldLabel: string
  changePersonalInfo: (fieldType: string, field: string, value: string) => void
  setTouched: (fieldType: string, field: string) => void
  childRef: any
  placeholder?: string
  type?: string
  onClick?: (e: React.MouseEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function PersonalInfoField({
  personalInfo,
  fieldType,
  fieldName,
  fieldLabel,
  changePersonalInfo,
  setTouched,
  childRef,
  placeholder,
  type,
  onClick,
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
        personalInfo[fieldType][fieldName].required &&
          personalInfo[fieldType][fieldName].touched &&
          !personalInfo[fieldType][fieldName].value &&
          'error',
      )}
    >
      <label htmlFor={fieldName}>{fieldLabel}</label>
      {type === 'textarea' ? (
        <textarea
          ref={childRef}
          id={fieldName}
          name={fieldName}
          value={personalInfo[fieldType][fieldName].value}
          onChange={(e) => changePersonalInfo(fieldType, e.target.name, e.target.value)}
          onBlur={(e) => validateField(e, fieldType)}
          placeholder={placeholder}
          field-type={fieldType}
          onClick={onClick}
        />
      ) : (
        <input
          ref={childRef}
          id={fieldName}
          name={fieldName}
          type={fieldName === 'email' ? 'email' : 'text'}
          value={personalInfo[fieldType][fieldName].value}
          onChange={(e) => changePersonalInfo(fieldType, e.target.name, e.target.value)}
          onBlur={(e) => validateField(e, fieldType)}
          placeholder={placeholder}
          field-type={fieldType}
          onClick={onClick}
        />
      )}
      {personalInfo[fieldType][fieldName].required && (
        <div className="error-message">
          <span>Pole je povinné</span>
        </div>
      )}
    </div>
  )
}

PersonalInfoField.defaultProps = {
  type: '',
  placeholder: '',
  onClick: undefined,
}

export default PersonalInfoField
