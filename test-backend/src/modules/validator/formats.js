import moment from 'moment'

const validDate = (val) => {
  return moment(val).isValid()
}

export default {
  validDate
}
