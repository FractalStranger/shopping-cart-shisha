import { SAVE_PERSONAL_INFO_FIELDS_REFS } from '../actions/personalInfo'

export const INITIAL_STATE = {
  personalInfo: {},
}

const fieldsRefsR = (state = INITIAL_STATE, action: any) => {
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
