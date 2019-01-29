<template>
  <div id="app">
    <router-view/>
    <notifications classes="custom-notifi" position="right bottom" :max="1"></notifications>
  </div>
</template>

<script>
  import validation from './data/validation.js'

  export default {
    mounted() {
      this.$validator.dictionary.merge(validation)
    }
  }
</script>

<style lang="scss">
  @import './styles/main.scss';
</style>

