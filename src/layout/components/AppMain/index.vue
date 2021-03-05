<template>
  <div class="app-main-container">
    <header-bar/>
    <router-view/>
  </div>
</template>

<script>
import HeaderBar from '../HeaderBar'

export default {
  data () {
    return {}
  },
  components: {
    HeaderBar,
  }
} 
</script>

<style lang="scss" scoped>
.app-main-container {
  flex: 1;
  overflow: hidden;
}
</style>
