<template>
  <div class="pageContainer">
    <x-header >k12VUX</x-header>
    <group>
      <cell required title="标题" is-link>
        <div>k12</div>
      </cell>
    </group>
    <div class="remain">{{msg}}</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import { XHeader, Cell, Group } from 'k12vux'
import { wisToast } from '../utils/util'

export default {
  components: {
    XHeader, Cell, Group
  },
  async created () {
    wisToast('O(∩_∩)O')
  },
  async mounted () {

  },
  data () {
    return {
      msg: '欢迎使用k12vux-ui!'
    }
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
    display: flex;
    flex-direction: column;
    height: 100vh;
    & .remain{
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 20px;
    }
  }
</style>
