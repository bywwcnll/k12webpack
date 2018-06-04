<template>
  <div class="pageContainer">

  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  async created () {

  },
  async mounted () {

  },
  data () {
    return {}
  },
  computed: {
    ...mapState('common', []),
    ...mapGetters('common', [])
  },
  watch: {},
  filters: {},
  methods: {
    ...mapActions('common', [])
  }
}
</script>

<style scoped lang="scss">
  .pageContainer {

  }
</style>
