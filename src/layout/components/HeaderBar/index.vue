<template>
  <div class="header-bar-container">
    <div class="header-left">
      <hamburger/>
      <bread-crumb/>
    </div>
    <div class="header-right">
      <user-info/>
      <header-dropdown/>
    </div>
  </div>
</template>

<script>
import Hamburger from 'components/common/Hamburger'
import BreadCrumb from 'components/common/BreadCrumb'
import UserInfo from 'components/content/UserInfo'
import HeaderDropdown from 'components/content/HeaderDropdown'
export default {
  data() {
    return {
        
    }
  },
  components: {
    Hamburger,
    BreadCrumb,
    UserInfo,
    HeaderDropdown
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
  margin-bottom: 40px;
}
.header-left {
  display: flex;
  align-items: center;
}
.header-right {
  display: flex;
  align-items: center;
}
</style>
