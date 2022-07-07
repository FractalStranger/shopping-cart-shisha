import { parseISO } from 'date-fns'
import React, { useCallback } from 'react'
import classnames from 'classnames'
import DatePicker, { registerLocale } from 'react-datepicker'
import skSK from 'date-fns/locale/sk'
import OrderShape from '../../shapes/OrderShape'
import ReservationShape from '../../shapes/ReservationShape'

registerLocale('SK', { ...skSK, options: { ...skSK.options, weekStartsOn: 1 } })

type Props = {
  personalInfo: OrderShape['personalInfo']
  fieldType: string
  fieldName: string
  fieldLabel: string
  changePersonalInfo: (fieldType: string, field: string, value: Date | [Date, Date] | null) => void
  setTouched: (fieldType: string, field: string) => void
  childRef: any
  minDate?: Date
  maxDate?: Date
  pickerRef?: React.MutableRefObject<any>
  onCalendarClose?: () => void
  disabled?: boolean
  error?: string
  reservations: ReservationShape[]
}

function TimeField({
  personalInfo,
  fieldType,
  fieldName,
  fieldLabel,
  changePersonalInfo,
  setTouched,
  childRef,
  minDate,
  maxDate,
  pickerRef,
  onCalendarClose,
  disabled = false,
  error,
  reservations,
}: Props) {
  // const [minTime, setMinTime] = useState<Date | undefined>()
  const validateField = useCallback(
    (e, fType) => {
      const { name } = e.target
      setTouched(fType, name)
    },
    [setTouched],
  )

  // const handleMinTime = () =>
  //   setMinTime(
  //     minDate && isSameDay(personalInfo[fieldType][fieldName].value, minDate) ? minDate : undefined,
  //   )

  // useEffect(() => handleMinTime, [minDate, personalInfo[fieldType][fieldName].value])
  return (
    <div
      className={classnames('input-wrapper', {
        error:
          error ||
          (personalInfo[fieldType][fieldName].required &&
            personalInfo[fieldType][fieldName].touched &&
            !personalInfo[fieldType][fieldName].value),
      })}
      // ref={childRef}
      // field-type={fieldType}
    >
      <label htmlFor={fieldName}>{fieldLabel}</label>
      <DatePicker
        ref={pickerRef}
        // customInputRef={pickerRef}
        id={fieldName}
        name={fieldName}
        selected={personalInfo[fieldType][fieldName].value}
        onChange={(date) => changePersonalInfo(fieldType, fieldName, date as Date)}
        timeCaption="Čas"
        showTimeSelect
        // onInputClick={handleMinTime}
        // dateFormat="MMMM d, yyyy h:mm aa"
        dateFormat="Pp"
        placeholderText="Vyber"
        locale="SK"
        calendarStartDay={1}
        minDate={minDate}
        maxDate={maxDate}
        // minTime={minTime}
        // maxTime={minTime ? endOfDay(new Date()) : undefined}
        onBlur={(e) => validateField(e, fieldType)}
        onCalendarClose={onCalendarClose}
        autoComplete="off"
        disabled={disabled}
        // TODO: exclude only reserved times if there is not whole day reserved
        excludeDateIntervals={reservations?.map((reservation) => ({
          start: parseISO(reservation.min),
          end: parseISO(reservation.max),
        }))}
      />
      <input
        ref={childRef}
        name={fieldName}
        // value={personalInfo[fieldType][fieldName].value}
        field-type={fieldType}
        style={{ display: 'none' }}
        disabled={disabled}
      />
      {(error || personalInfo[fieldType][fieldName].required) && (
        <div className="error-message">
          <span>{error || 'Pole je povinné'}</span>
        </div>
      )}
    </div>
  )
}

TimeField.defaultProps = {
  minDate: undefined,
  maxDate: undefined,
  onCalendarClose: undefined,
  pickerRef: undefined,
  disabled: false,
  error: undefined,
}

export default TimeField
