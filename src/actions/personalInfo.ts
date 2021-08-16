export const CHANGE_PERSONAL_INFO = 'CHANGE_PERSONAL_INFO'
export const SET_TOUCHED = 'SET_TOUCHED'
export const HANDLE_DIFFERENT_DELIVERY_ADDRESS = 'HANDLE_DIFFERENT_DELIVERY_ADDRESS'
export const SAVE_PERSONAL_INFO_FIELDS_REFS = 'SAVE_PERSONAL_INFO_FIELDS_REFS'

export function changePersonalInfo(
  fieldType: string,
  field: string,
  value: string | boolean | Date | [Date, Date] | null,
) {
  return {
    type: CHANGE_PERSONAL_INFO,
    fieldType,
    field,
    value,
  }
}

export function setTouched(fieldType: string, field: string) {
  return {
    type: SET_TOUCHED,
    fieldType,
    field,
  }
}

export function savePersonalInfoFieldsRefs(fieldsRefs: any) {
  return {
    type: SAVE_PERSONAL_INFO_FIELDS_REFS,
    fieldsRefs,
  }
}
