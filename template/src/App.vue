<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import './styles/App.scss'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  async created () {
    // let res = await this.getCurrentUser()
    // window.corpId = res.data ? res.data.corpId : ''
  },
  methods: {
    ...mapActions('common', ['getCurrentUser'])
  }
}
</script>

<style scoped lang="scss">

</style>
