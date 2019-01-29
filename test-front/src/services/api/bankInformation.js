import Vue from 'vue'
import Bank from "../../model/bank";

export default {
  appendFormData(inf, file) {
    let formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('newBankInf', JSON.stringify(inf));

    return formData
  },
  create(newBankInf, file) {
    let formData = this.appendFormData(newBankInf, file);
    return Vue.prototype.$api.post('/bank-information', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  update(bankInf, file) {
    let formData = this.appendFormData(bankInf, file);
    return Vue.prototype.$api.put(`/bank-information/${bankInf.id}` , formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
  },
  getAll() {
    return Vue.prototype.$api.get('/bank-information').then(res => {
        return res.data.map(d => new Bank(d));
    });
  },
  delete(id) {
    return Vue.prototype.$api.delete(`/bank-information/${id}`)
      .then(({ data }) => {
          return data
      })
  }
}
