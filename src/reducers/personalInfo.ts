import { Action } from 'redux'
import { CHANGE_PERSONAL_INFO, SET_TOUCHED } from '../actions/personalInfo'

export interface PersonalInfoState {
  [key: string]: any
  basic: {
    [key: string]: any
    email: {
      value: string
      touched: boolean
      required: boolean
    }
    phoneNr: {
      value: string
      touched: boolean
      required: boolean
    }
    dateOfBirth: {
      value: string
      touched: boolean
      required: boolean
    }
  }
  deliveryAddress: {
    [key: string]: any
    fullName: {
      value: string
      touched: boolean
      required: boolean
    }
    street: {
      value: string
      touched: boolean
      required: boolean
    }
    district: {
      value: string
      touched: boolean
      required: boolean
    }
    customerNote: {
      value: string
      touched: boolean
      required: boolean
    }
  }
  deliveryTime: {
    [key: string]: any
    from: {
      value?: Date
      touched: boolean
      required: boolean
    }
    to: {
      value?: Date
      touched: boolean
      required: boolean
    }
  }
  consents: {
    [key: string]: any
    dataProcessing: {
      value: boolean
      touched: boolean
      required: boolean
    }
  }
}

export const INITIAL_STATE: PersonalInfoState = {
  basic: {
    email: {
      value: '',
      touched: false,
      required: true,
    },
    phoneNr: {
      value: '',
      touched: false,
      required: true,
    },
    dateOfBirth: {
      value: '',
      touched: false,
      required: true,
    },
  },
  deliveryAddress: {
    fullName: {
      value: '',
      touched: false,
      required: true,
    },
    street: {
      value: '',
      touched: false,
      required: true,
    },
    district: {
      value: '',
      touched: false,
      required: true,
    },
    customerNote: {
      value: '',
      touched: false,
      required: false,
    },
  },
  deliveryTime: {
    from: {
      value: undefined,
      touched: false,
      required: true,
    },
    to: {
      value: undefined,
      touched: false,
      required: true,
    },
  },
  consents: {
    dataProcessing: {
      value: false,
      touched: false,
      required: true,
    },
  },
}

interface PersonalInfoAction extends Action {
  fieldType: string
  field: string
  value: string | boolean | Date | [Date, Date] | null
  checked: boolean
}

const personalInfo = (state: any = INITIAL_STATE, action: PersonalInfoAction) => {
  const { type, fieldType, field, value, checked } = action

  switch (type) {
    case CHANGE_PERSONAL_INFO:
      switch (fieldType) {
        case 'basic':
          return {
            ...state,
            basic: {
              ...state.basic,
              [field]: {
                ...state.basic[field],
                value,
              },
            },
          }
        case 'deliveryAddress':
          return {
            ...state,
            deliveryAddress: {
              ...state.deliveryAddress,
              [field]: {
                ...state.deliveryAddress[field],
                value,
              },
            },
          }
        case 'deliveryTime':
          return {
            ...state,
            deliveryTime: {
              ...state.deliveryTime,
              [field]: {
                ...state.deliveryTime[field],
                value,
              },
            },
          }
        case 'consents':
          return {
            ...state,
            consents: {
              ...state.consents,
              [field]: {
                ...state.consents[field],
                value,
                touched: true,
              },
            },
          }
        default:
          return {
            ...state,
            basic: {
              ...state.basic,
              [field]: {
                ...state.basic[field],
                value,
              },
            },
          }
      }
    case SET_TOUCHED:
      switch (fieldType) {
        case 'basic':
          return {
            ...state,
            basic: {
              ...state.basic,
              [field]: {
                ...state.basic[field],
                touched: true,
              },
            },
          }
        case 'deliveryAddress':
          return {
            ...state,
            deliveryAddress: {
              ...state.deliveryAddress,
              [field]: {
                ...state.deliveryAddress[field],
                touched: true,
              },
            },
          }
        case 'deliveryTime':
          return {
            ...state,
            deliveryTime: {
              ...state.deliveryTime,
              [field]: {
                ...state.deliveryTime[field],
                touched: true,
              },
            },
          }
        case 'consents':
          return {
            ...state,
            consents: {
              ...state.consents,
              [field]: {
                ...state.consents[field],
                touched: true,
              },
            },
          }
        default:
          return {
            ...state,
            basic: {
              ...state.basic,
              [field]: {
                ...state.basic[field],
                touched: true,
              },
            },
          }
      }
    default:
      return state
  }
}

export default personalInfo
