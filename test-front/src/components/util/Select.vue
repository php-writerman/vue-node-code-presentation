<template>
    <select :value="value" @change="setValue($event.target.value)" class="custom-select-dop form-control">
        <option v-if="placeholder" class="option-custom" selected disabled>{{ placeholder }}</option>
        <option v-for="(value, label) in options" class="option-custom" :key="value" :value="value">{{ label }}</option>
    </select>
</template>

<script>
  export default {
    name: "Select",
    data() {
      return {
        defaultHolder: this.default,
      };
    },
    props: {
      value: {required: true},
      options: {
        type: Object,
        required: true,
      },
      default: {
        type: null,
        required: false,
      },
      placeholder: {
        type: String,
        required: false,
      },
    },
    mounted() {
      if (this.defaultHolder) {
        if (null === this.value || undefined === this.value) {
          const $default = this.defaultHolder;
          this.$nextTick(() => this.setValue($default));
        }

        this.defaultHolder = null;
      }
    },
    methods: {
      setValue(value) {
        this.$emit('change', value);
      },
    },
  }
</script>
