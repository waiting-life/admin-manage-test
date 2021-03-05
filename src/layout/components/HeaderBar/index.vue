<template>
  <div class="header-bar-container">
    <div class="header-left">
      <hamburger/>
      <bread-crumb/>
    </div>
    <div class="header-right">
      <user-info/>
    </div>
  </div>
</template>

<script>
import Hamburger from 'components/common/Hamburger'
import BreadCrumb from 'components/common/BreadCrumb'
import UserInfo from 'components/content/UserInfo'
export default {
  data() {
    return {
        
    }
  },
  components: {
    Hamburger,
    BreadCrumb,
    UserInfo
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.header-bar-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(192, 197, 197, 0.2);
}
.header-left {
  display: flex;
  align-items: center;
}

</style>
