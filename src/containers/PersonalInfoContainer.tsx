import { connect } from 'react-redux'

import PersonalInfo from '../components/PersonalInfo'

import { proceed } from '../actions'
import { changePersonalInfo, setTouched, savePersonalInfoFieldsRefs } from '../actions/personalInfo'

function mapStateToProps(state: any, ownProps: any) {
  return {
    ...ownProps,
    personalInfo: state.personalInfo,
    activeStep: state.activeStep,
  }
}

export default connect(mapStateToProps, {
  proceed,
  changePersonalInfo,
  setTouched,
  savePersonalInfoFieldsRefs,
})(PersonalInfo)
