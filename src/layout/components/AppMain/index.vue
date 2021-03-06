<template>
  <div class="app-main-container">
    <header-bar/>
    <router-view :key="key"/>
  </div>
</template>

<script>
import HeaderBar from '../HeaderBar'

export default {
  name: 'AppMain',
  data () {
    return {}
  },
  computed: {
   key() {
      const randomNumber = Math.random().toString();
      return this.$route.name !== undefined ? this.$route.name + randomNumber : this.$route + randomNumber;
    },
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
