import { Action } from 'redux'
import { SAVE_PERSONAL_INFO_FIELDS_REFS } from '../actions/personalInfo'

export const INITIAL_STATE = {
  personalInfo: {},
}

interface FieldsRefAction extends Action<typeof SAVE_PERSONAL_INFO_FIELDS_REFS> {
  fieldsRefs: React.MutableRefObject<unknown>
}

const fieldsRefsR = (state = INITIAL_STATE, action: FieldsRefAction) => {
  const { type, fieldsRefs } = action
  switch (type) {
    case SAVE_PERSONAL_INFO_FIELDS_REFS:
      return {
        ...state,
        personalInfo: fieldsRefs,
      }
    default:
      return state
  }
}

export default fieldsRefsR
