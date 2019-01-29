export default {
  methods: {
    isNumber(evt) {
      const regNum = new RegExp('^[0-9]$');
      if (!regNum.test(evt.key)) {
        evt.preventDefault()
      }
    }
  }
}
