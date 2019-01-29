<template>
    <form class="col-lg-12 forms-block" @submit.prevent="submit">
        <div class="row">
            <div class="form-group col-md-6">
                <label class="label-l">Bank Name *</label>
                <div class="custom-multiselect input-type">
                    <multiselect v-model="bankNameModel" name="bankName" v-validate="'required'" :options="turkishBanks"
                                 placeholder="Select one" label="name" track-by="name" :maxHeight="250"
                                 selectLabel="" deselectLabel="" selectedLabel="" @select="sendBankName($event.name)">

                        <span slot="noResult">Sorry, the bank with this name does not exist.</span>
                    </multiselect>
                </div>
                <div class="invalid-feedback">
                    {{ errors.first('bankName') }}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label class="label-l" for="inputSwiftCode">SWIFT code (optional)</label>
                <input type="text" v-model="bank.swiftCode" class="form-control form-control-search" name="swiftcode" id="inputSwiftCode" placeholder="SWIFT code (optional)">
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label class="label-l" for="inputIBAN">IBAN *</label>
                <input type="text" v-model="bank.iban" class="form-control" id="inputIBAN" v-validate="'required'" name="iban" placeholder="IBAN">
                <div class="invalid-feedback">
                    {{ errors.first('iban') }}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label class="label-l" for="inputBranchCode">Branch Code *</label>
                <input type="number" v-model="bank.branchCode" class="form-control" id="inputBranchCode" @keypress="isNumber"
                       v-validate="'required'" name="branchcode" placeholder="Branch code">
                <div class="invalid-feedback">
                    {{ errors.first('branchcode') }}
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-md-6">
                <label class="label-l" for="inputAmount">Amount *</label>
                <input type="number" v-model.number="bank.amount" class="form-control" id="inputAmount" @keypress="isNumber"
                       v-validate="'required|numeric'" name="amout" placeholder="Amount">
                <div class="invalid-feedback">
                    {{ errors.first('amout') }}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label class="label-l" for="inputAccountnumber">Account number *</label>
                <input type="number" v-model="bank.accountNumber" class="form-control" id="inputAccountnumber" @keypress="isNumber"
                       v-validate="'required|numeric'" name="accountNumber" placeholder="Account number">
                <div class="invalid-feedback">
                    {{ errors.first('accountNumber') }}
                </div>
            </div>
        </div>
        <p class="mb-0">Letter of Credit:</p>
        <div class="upload_block mt-15 mb-30">
            <vue-dropzone class="upload_block" id="dropzone" ref="dropzone" @vdropzone-file-added="afterCompleteUpload"
                          :options="dropzoneOptions"/>
            <div v-if="bank.consumptionFile" class="wrapper-table wrapper-table-tn mb-0 mt-30">
                <div class="table-responsive table-responsive-dop table-responsive-italic">
                    <table class="table" cellspacing="2">
                        <tbody>
                        <tr class="cursor-a">
                            <td class="w_110 border-tr pr-0">
                                <div class="max-w-90 pr-30"><i class="icon-check color-green fs-14 mr-2"></i> Status:
                                </div>
                            </td>
                            <td class="border-tr pl-30">
                                <div class="dark-grey fw-900">Your Letter of Credit is Uploaded</div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="warning-feedback mt-10" v-if="bank.letterOfCredit">
                You already upload letter of credit. If you upload new one, previous will be removed.
            </div>
        </div>

        <div class="row mb-10">
            <div class="form-group col-md-12">
                <label class="label-l">Type of credit *</label>
                <div class="wrapper-select">
                    <Select v-model="bank.typeOfCredit"
                            v-validate="'required'" name="typeOfCredit"
                            :placeholder="'Choose type of credit'"
                            :options="{'Revocable': 'Revocable', 'Credit': 'Credit', 'Invoice': 'Invoice'}"
                            @change="bank.typeOfCredit = $event"/>
                    <div class="invalid-feedback">
                        {{ errors.first('typeOfCredit') }}
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="form-group col-md-6">
                <label class="label-l">Issued Date *</label>
                <div class="poz-rel time-picker">
                    <vue-ctk-date-time-picker
                            v-model="bank.issuedDate"
                            color="#FDCA40"
                            formatted="DD MMM YYYY"
                            label="Choose date"
                            without-header
                            disable-time
                            name="issuedDate"
                            v-validate="'required'"
                    />
                    <i class="icon-calendar color-blue"></i>
                </div>
                <div class="invalid-feedback">
                    {{ errors.first('issuedDate') }}
                </div>
            </div>
            <div class="form-group col-md-6">
                <label class="label-l">
                    Expiry Date *
                </label>
                <div class="poz-rel time-picker">
                    <vue-ctk-date-time-picker
                            v-model="bank.expiryDate"
                            color="#FDCA40"
                            formatted="DD MMM YYYY"
                            label="Choose date"
                            without-header
                            disable-time
                            name="expiryDate"
                            :min-date="bank.issuedDate"
                            v-validate="'required'"
                    />
                    <i class="icon-calendar color-blue"></i>
                </div>
                <div class="invalid-feedback">
                    {{ errors.first('expiryDate') }}
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <button type="submit" class="btn btn-blue mt-15 mb-40">{{bank.id ? 'Update' : 'Create'}} Bank</button>
            </div>
        </div>
    </form>
</template>

<script>
  import turkishBanks from '../data/turkishBanks.js'
  import Select from "./util/Select";
  import validate from "../services/validate";

  export default {
    name: "BankInformationForm",
    components: { Select },
    props: {
      bank: {
        type: Object,
        required: true,
      },
      afterSubmitBunk: {
        type: Function,
        required: true
      }
    },
    mixins: [validate],
    data() {
      return {
        turkishBanks,
        dropzoneOptions: {
          acceptedFiles: '.pdf',
          autoProcessQueue: false,
          url: 'https://httpbin.org/post',
          addRemoveLinks: true,
          dictDefaultMessage: "<i class='icon-upload icon-blue fs-36'></i><p class='min color-blue'>Click To Upload Your Document or Drag it Here</p>",
        },
        bankNameModel: undefined,
        uploadedFile: undefined,
        listBanks: [],
      };
    },
    mounted() {
      this.initBankName(this.bank);
      this.$validator.pause();
    },
    watch: {
      bank: function (newVal) {
        this.initBankName(newVal)
      }
    },
    methods: {
      afterCompleteUpload(file) {
        this.uploadedFile = file;
      },
      initBankName(newBank) {
        this.bankNameModel  = newBank.name ? { name: newBank.name } : undefined;
      },
      sendBankName(text) {
        this.bank.name = text
      },
      submit () {
        this.$validator.resume();
        this.$validator.validateAll().then( isValid => {
          if (isValid) {
            this.updateOrCreateBank(!this.bank.id ? 'create' : 'update')
          }
        })
      },
      updateOrCreateBank(type) {
        this.$API.bank[type](this.bank, this.uploadedFile).then(() => {
          this.$validator.pause();
          this.$refs.dropzone.removeAllFiles();
          this.afterSubmitBunk();

          this.$notify({
            title: ' ',
            type: 'success',
            text: `Your bank information was ${type}d successfully`
          });
        })
      }
    }
  }
</script>
