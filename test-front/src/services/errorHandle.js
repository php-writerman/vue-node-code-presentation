const mapFieldsErrors = fields => Object.values(fields).join('\n')

export default {
  buildNotifyMsg(error) {
    return error.fields
      ? mapFieldsErrors(error.fields)
      : error.message
  }
}
