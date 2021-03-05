<template>
  <div class="layout-container">
    <side-bar/>
    <app-main/>
  </div>
</template>

<script>
import SideBar from './components/SideBar'
import AppMain from './components/AppMain'

export default {
  data () {
    return {}
  },
  created () { },
  mounted () { },
  methods: {},
  components: {
    SideBar,
    AppMain
  }
}
</script>

<style lang="scss" scoped>
.layout-container {
  display: flex;
}
</style>
