<template>
  <div class="wrapper-forms-block clearfix">
    <Header></Header>
    <div class="body">
      <div class="bank-information-table">
        <div class="table-responsive table-responsive-dop table-responsive-italic">
          <table class="table" cellspacing="0">
            <thead>
            <tr>
              <th scope="col"><div>Bank Name</div></th>
              <th scope="col"><div>Amount (TRY)</div></th>
              <th scope="col"><div>Issued</div></th>
              <th scope="col"><div>Expires</div></th>
              <th scope="col"><div>Letter Of Credit</div></th>
              <th scope="col" class="text-center"><div class="w_90"></div></th>
            </tr>
            </thead>
            <tbody>
            <tr v-if="null === listBanks">
              <td colspan="6"><i>Loading information...</i></td>
            </tr>
            <tr v-else-if="0 === listBanks.length">
              <td colspan="6"><i>No results to display</i></td>
            </tr>
            <tr v-else :class="bankItem.id === bank.id ? 'updated' : ''" v-for="bankItem in listBanks" :key="bankItem.id">
              <td scope="col"><div>{{bankItem.name}}</div></td>
              <td scope="col"><div class="fw-900 color-black">{{bankItem.amount}} TRY</div></td>
              <td scope="col"><div class="fw-900 color-black">{{bankItem.issuedDate|moment('MMM DD, YYYY')}}</div></td>
              <td scope="col"><div>{{bankItem.expiryDate|moment('MMM DD, YYYY')}}</div></td>
              <td scope="col">
                <div class="fw-900 color-blue">
                  <a v-if="bankItem.letterOfCredit" target="_blank" :href="`${$api.defaults.baseURL}/files/${bankItem.letterOfCredit.name}`" class="blue min fs-14">
                    {{bankItem.letterOfCredit.originalName}}
                  </a>
                </div>
              </td>
              <td scope="col" class="text-center w_90">
                <button type="button" name="button" class="btn-remove" @click.prevent="removeBank(bankItem.id)">
                  <i class="drafts-img icon-bin icon-blue"></i>
                </button>
                <button type="button" name="button" class="btn-remove ml-10" @click.prevent="updateBank(bankItem)">
                  <i class="drafts-img icon-pencil icon-blue"></i>
                </button>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row pt-25" v-if="bank.id || !(listBanks && listBanks.length >= 5)">
        <BankInformationForm :bank="bank" :afterSubmitBunk="afterSubmitBunk"  ref="BankInformationForm"/>
      </div>
    </div>
  </div>
</template>

<script>
  import BankInformationForm from "../components/BankInformationForm";
  import Bank from "../model/bank";
  import Header from "../components/Header";

  export default {
    name: 'bank-information',
    components: { Header, BankInformationForm },
    data() {
      return {
        listBanks: null,
        bank: new Bank()
      }
    },
    mounted() {
      this.getBanksInformation()
    },
    methods: {
      afterSubmitBunk() {
        this.bank = new Bank();
        this.getBanksInformation();
      },
      updateBank(bank) {
        this.bank = bank.id === this.bank.id ? new Bank() : {...bank};
      },
      removeBank(id) {
        this.$API.bank.delete(id).then(( { removedId }) => {
          const indexInArray = this.listBanks.findIndex(bank => bank.id === removedId);
          this.listBanks.splice(indexInArray, 1)
        })
      },
      getBanksInformation() {
        this.$API.bank.getAll().then(listBanks => this.listBanks = listBanks)
      },
    }
  }
</script>
